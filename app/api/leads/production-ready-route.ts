import { NextResponse } from 'next/server';
import { z } from 'zod'; // For validation
import { rateLimit } from '@/lib/rate-limit'; // Assuming you'll create this
import { logger } from '@/lib/logger'; // Assuming you'll create this

// Email validation schema
const LeadSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
  name: z.string().optional(),
  company: z.string().optional(),
  referrer: z.string().optional(),
});

// Rate limiter configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per interval
  limit: 5, // 5 requests per minute per IP
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  try {
    // Apply rate limiting
    try {
      await limiter.check(ip);
    } catch (error) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = LeadSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => e.message).join(', ');
      logger.warn(`Validation error: ${errorMessage}`, { ip });
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    const { email, source, name, company, referrer } = validationResult.data;
    
    // Prepare lead data with additional context
    const leadData = {
      email,
      source: source || 'website',
      name: name || null,
      company: company || null,
      referrer: referrer || request.headers.get('referer') || null,
      userAgent: request.headers.get('user-agent') || null,
      ip: process.env.NODE_ENV === 'production' ? ip : 'development',
      timestamp: new Date().toISOString(),
    };
    
    // INTEGRATION POINT: Store lead in database
    // Uncomment and configure one of these options:
    
    // Option 1: Firebase Firestore
    /*
    import { db } from '@/lib/firebase';
    await db.collection('leads').add(leadData);
    */
    
    // Option 2: PostgreSQL with Prisma
    /*
    import { prisma } from '@/lib/prisma';
    await prisma.lead.create({
      data: leadData
    });
    */
    
    // Option 3: MongoDB
    /*
    import { connectToDatabase } from '@/lib/mongodb';
    const { db } = await connectToDatabase();
    await db.collection('leads').insertOne(leadData);
    */
    
    // Option 4: CRM Integration (HubSpot example)
    /*
    import { hubspotClient } from '@/lib/hubspot';
    await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        email: email,
        firstname: name?.split(' ')[0] || '',
        lastname: name?.split(' ').slice(1).join(' ') || '',
        company: company,
        lead_source: source || 'website',
      }
    });
    */
    
    // For now, log the lead (development only)
    if (process.env.NODE_ENV !== 'production') {
      console.log('[NEW LEAD]', leadData);
    }
    
    // Log successful lead capture
    logger.info(`Lead captured: ${email}`, { 
      source: leadData.source,
      referrer: leadData.referrer
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your interest! We\'ll be in touch soon.'
    });
    
  } catch (err) {
    // Log error
    logger.error(`Lead capture error: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      ip,
      stack: err instanceof Error ? err.stack : undefined
    });
    
    // Return error response
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}