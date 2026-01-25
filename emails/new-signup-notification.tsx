import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewSignupNotificationEmailProps {
  userEmail: string;
  userName?: string;
  signupTime: string;
}

export const NewSignupNotificationEmail = ({
  userEmail,
  userName,
  signupTime,
}: NewSignupNotificationEmailProps) => {
  const previewText = `New signup: ${userEmail}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={emoji}>🎉</Text>
            <Heading style={h1}>New User Signup!</Heading>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={paragraph}>
              Someone just signed up for ProofLayer:
            </Text>

            <Section style={detailsBox}>
              <Text style={detailRow}>
                <span style={detailLabel}>Email:</span>
                <span style={detailValue}>{userEmail}</span>
              </Text>
              {userName && (
                <Text style={detailRow}>
                  <span style={detailLabel}>Name:</span>
                  <span style={detailValue}>{userName}</span>
                </Text>
              )}
              <Text style={detailRow}>
                <span style={detailLabel}>Time:</span>
                <span style={detailValue}>{signupTime}</span>
              </Text>
            </Section>

            <Text style={tipText}>
              Consider reaching out to welcome them personally!
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              ProofLayer Signup Notification
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewSignupNotificationEmail;

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
  maxWidth: '400px',
};

const header = {
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  padding: '30px',
  textAlign: 'center' as const,
};

const emoji = {
  fontSize: '40px',
  margin: '0 0 10px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1.2',
};

const content = {
  padding: '30px',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#333333',
};

const detailsBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '0 0 20px',
};

const detailRow = {
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 4px',
  color: '#333333',
};

const detailLabel = {
  color: '#64748b',
  marginRight: '8px',
};

const detailValue = {
  fontWeight: '600',
  color: '#1e293b',
};

const tipText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#64748b',
  margin: '0',
  fontStyle: 'italic' as const,
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '16px 30px',
  borderTop: '1px solid #e6e6e6',
};

const footerText = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#999999',
  margin: '0',
  textAlign: 'center' as const,
};
