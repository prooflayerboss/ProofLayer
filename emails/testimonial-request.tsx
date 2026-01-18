import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface TestimonialRequestEmailProps {
  recipientName?: string;
  senderName: string;
  senderCompany?: string;
  formUrl: string;
  customMessage?: string;
}

export const TestimonialRequestEmail = ({
  recipientName,
  senderName,
  senderCompany,
  formUrl,
  customMessage,
}: TestimonialRequestEmailProps) => {
  const previewText = `${senderName} would love your feedback`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with subtle gradient */}
          <Section style={header}>
            <Heading style={h1}>Your Feedback Matters</Heading>
            <Text style={headerSubtext}>
              We'd love to hear about your experience
            </Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>
              {recipientName ? `Hi ${recipientName},` : 'Hi there,'}
            </Text>

            <Text style={paragraph}>
              I'm {senderName}
              {senderCompany ? ` from ${senderCompany}` : ''}, and I'm reaching
              out because your feedback would mean a lot to us.
            </Text>

            {customMessage && (
              <Section style={customMessageBox}>
                <Text style={customMessageText}>{customMessage}</Text>
              </Section>
            )}

            <Text style={paragraph}>
              Would you mind taking a couple of minutes to share your experience?
              Your testimonial will help others understand the value we provide.
            </Text>

            <Text style={paragraph}>
              You can share your thoughts in any format you prefer:
            </Text>

            <ul style={list}>
              <li style={listItem}>
                <strong>Written testimonial</strong> - Quick and easy
              </li>
              <li style={listItem}>
                <strong>Video testimonial</strong> - Record a short video (more impactful!)
              </li>
              <li style={listItem}>
                <strong>Screenshot</strong> - Share a social media post
              </li>
            </ul>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={formUrl}>
                Share Your Feedback
              </Button>
            </Section>

            <Text style={smallText}>
              This should only take 2-3 minutes of your time.
            </Text>

            <Text style={paragraph}>
              Thank you so much for your support!
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              {senderName}
              {senderCompany && (
                <>
                  <br />
                  {senderCompany}
                </>
              )}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Powered by{' '}
              <Link href="https://prooflayer.app" style={footerLink}>
                ProofLayer
              </Link>
              {' '}- The testimonial platform you own forever
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TestimonialRequestEmail;

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
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  color: '#e6e6ff',
  fontSize: '16px',
  margin: '0',
  fontWeight: '400',
};

const content = {
  padding: '40px 30px',
};

const greeting = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#333333',
  fontWeight: '500',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#333333',
};

const customMessageBox = {
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #667eea',
  padding: '16px 20px',
  margin: '24px 0',
  borderRadius: '4px',
};

const customMessageText = {
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
  color: '#444444',
  fontStyle: 'italic' as const,
};

const list = {
  paddingLeft: '20px',
  margin: '0 0 24px',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 8px',
  color: '#333333',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#667eea',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  boxShadow: '0 2px 4px rgba(102, 126, 234, 0.4)',
};

const smallText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#666666',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const signature = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '32px 0 0',
  color: '#333333',
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
  color: '#667eea',
  textDecoration: 'none',
  fontWeight: '500',
};
