import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName?: string;
}

export const WelcomeEmail = ({
  userName,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to ProofLayer - Let's collect some testimonials!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Welcome to ProofLayer!</Heading>
            <Text style={headerSubtext}>
              You're all set to start collecting testimonials
            </Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>
              {userName ? `Hey ${userName}!` : 'Hey there!'}
            </Text>

            <Text style={paragraph}>
              Thanks for signing up for ProofLayer. I'm Curtis, the founder, and I personally
              wanted to welcome you and let you know I'm here if you need anything.
            </Text>

            <Text style={paragraph}>
              <strong>Quick start:</strong> Head to your dashboard, create a workspace,
              and you'll have a testimonial collection link ready in about 60 seconds.
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href="https://prooflayer.app/dashboard">
                Go to Dashboard
              </Button>
            </Section>

            <Section style={feedbackBox}>
              <Text style={feedbackTitle}>One small ask...</Text>
              <Text style={feedbackText}>
                I'm building ProofLayer to be the best testimonial tool out there, and your
                feedback is incredibly valuable. If you have any thoughts, questions, or run
                into any issues, just reply to this email. I read and respond to every one.
              </Text>
            </Section>

            <Text style={paragraph}>
              What made you sign up today? I'd love to hear what you're hoping to accomplish
              with ProofLayer.
            </Text>

            <Text style={signature}>
              Cheers,
              <br />
              Curtis
              <br />
              <span style={signatureTitle}>Founder, ProofLayer</span>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <Link href="https://prooflayer.app" style={footerLink}>
                ProofLayer
              </Link>
              {' '}- Collect testimonials. Display beautifully. Own forever.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginBottom: '64px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
};

const header = {
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px',
  lineHeight: '1.2',
};

const headerSubtext = {
  color: '#e0e7ff',
  fontSize: '16px',
  margin: '0',
  fontWeight: '400',
};

const content = {
  padding: '40px 30px',
};

const greeting = {
  fontSize: '18px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#333333',
  fontWeight: '600',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px',
  color: '#333333',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.4)',
};

const feedbackBox = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #f59e0b',
  padding: '20px 24px',
  margin: '28px 0',
  borderRadius: '4px',
};

const feedbackTitle = {
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
  color: '#92400e',
};

const feedbackText = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  color: '#78350f',
};

const signature = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '32px 0 0',
  color: '#333333',
};

const signatureTitle = {
  fontSize: '14px',
  color: '#666666',
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '24px 30px',
  borderTop: '1px solid #e6e6e6',
};

const footerText = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#999999',
  margin: '0',
  textAlign: 'center' as const,
};

const footerLink = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: '500',
};
