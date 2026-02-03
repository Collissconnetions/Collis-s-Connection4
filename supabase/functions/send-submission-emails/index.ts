import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SubmissionData {
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  vin: string;
  colour_exterior: string;
  colour_interior: string;
  condition: string;
  accident_history: boolean;
  service_history: string;
  modifications: string;
  issues: string;
  additional_notes: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { submissionData }: { submissionData: SubmissionData } = await req.json();

    const RESEND_API_KEY = "re_79dUnqTC_3i5yxDS7QaeQf38q9TryAp3D";
    const BUSINESS_EMAIL = "info@collissconnections.co.uk";

    // Send email to business owner
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vehicle Submissions <onboarding@resend.dev>",
        to: [BUSINESS_EMAIL],
        subject: `New Vehicle Submission: ${submissionData.year} ${submissionData.make} ${submissionData.model}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #1e293b; padding-bottom: 10px;">New Vehicle Submission</h2>
            
            <h3 style="color: #1e293b; margin-top: 25px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.owner_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.owner_email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.owner_phone}</td>
              </tr>
            </table>

            <h3 style="color: #1e293b; margin-top: 25px;">Vehicle Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Year:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.year}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Make:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.make}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Model:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.model}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Trim:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.trim || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Mileage:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.mileage.toLocaleString()} miles</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">VIN:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.vin || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Exterior Colour:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.colour_exterior}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Interior Colour:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.colour_interior}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Condition:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.condition.charAt(0).toUpperCase() + submissionData.condition.slice(1)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Accident History:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${submissionData.accident_history ? 'Yes' : 'No'}</td>
              </tr>
            </table>

            <h3 style="color: #1e293b; margin-top: 25px;">Additional Information</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h4 style="margin-top: 0; color: #1e293b;">Service History:</h4>
              <p style="white-space: pre-wrap; margin: 0;">${submissionData.service_history}</p>
            </div>

            ${submissionData.modifications ? `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h4 style="margin-top: 0; color: #1e293b;">Modifications:</h4>
              <p style="white-space: pre-wrap; margin: 0;">${submissionData.modifications}</p>
            </div>
            ` : ''}

            ${submissionData.issues ? `
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ef4444;">
              <h4 style="margin-top: 0; color: #991b1b;">Known Issues/Damage:</h4>
              <p style="white-space: pre-wrap; margin: 0;">${submissionData.issues}</p>
            </div>
            ` : ''}

            ${submissionData.additional_notes ? `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h4 style="margin-top: 0; color: #1e293b;">Additional Notes:</h4>
              <p style="white-space: pre-wrap; margin: 0;">${submissionData.additional_notes}</p>
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px;">
              <p>This submission was received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}.</p>
              <p>Photos and videos can be viewed in the admin panel.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      throw new Error(`Failed to send admin email: ${error}`);
    }

    // Send confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vehicle Submissions <onboarding@resend.dev>",
        to: [submissionData.owner_email],
        subject: "We've Received Your Vehicle Submission",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e293b; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Thank You for Your Submission</h1>
            </div>
            
            <div style="padding: 30px; background: white;">
              <p style="font-size: 16px; color: #1e293b; margin-top: 0;">Dear ${submissionData.owner_name},</p>
              
              <p style="font-size: 16px; color: #475569; line-height: 1.6;">
                We have successfully received your vehicle submission for your <strong>${submissionData.year} ${submissionData.make} ${submissionData.model}</strong>.
              </p>

              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">What happens next?</h3>
                <ul style="color: #475569; line-height: 1.8; padding-left: 20px;">
                  <li>Our team will carefully review your vehicle information and photos</li>
                  <li>We'll assess the market value and prepare a competitive offer</li>
                  <li>You'll receive a response from us within <strong>48 hours</strong></li>
                </ul>
              </div>

              <p style="font-size: 16px; color: #475569; line-height: 1.6;">
                We understand how important this decision is, and we're committed to providing you with a fair and transparent offer for your vehicle.
              </p>

              <p style="font-size: 16px; color: #475569; line-height: 1.6;">
                If you have any questions in the meantime, please don't hesitate to reach out to us.
              </p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
                <p style="font-size: 16px; color: #1e293b; margin-bottom: 5px;">Best regards,</p>
                <p style="font-size: 16px; color: #475569; margin-top: 5px;">The Vehicle Sales Team</p>
              </div>
            </div>

            <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      throw new Error(`Failed to send customer email: ${error}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});