# Commit Message

```
feat(landing): add lead modal + CTA wiring

- Add API endpoint for lead capture
- Add API endpoint for code analysis
- Enhance metadata with proper SEO and OG image settings
- Add placeholder OG images for social sharing

This commit implements the lead capture functionality with a client-side modal
that posts to the /api/leads endpoint. It also adds a mock code analysis endpoint
and improves SEO with proper metadata.
```

## Changes Summary

1. **API Endpoints**:
   - Created `/api/leads/route.ts` for lead capture
   - Created `/api/analysis/route.ts` for mock code analysis

2. **SEO & Metadata**:
   - Added App Router layout with comprehensive metadata
   - Added placeholder OG images for social sharing

3. **Next Steps**:
   - Replace console.log in leads endpoint with actual DB/CRM integration
   - Replace placeholder OG images with custom branded images
   - Add rate limiting and CAPTCHA for production

## Testing Instructions

1. Run locally with `next dev`
2. Open landing page and click "Get Started" or "Start Your Free Analysis"
3. Enter an email in the modal
4. Check terminal for "[NEW LEAD]" log
5. For analysis, submit code to the analysis endpoint and check response