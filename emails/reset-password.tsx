import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface ResetPasswordEmailProps {
  resetUrl?: string;
  emailTo?: string;
}

export const ResetPasswordEmail = ({
  resetUrl, emailTo
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>LiftLens Password Reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={headerSection}>
              <div style={headerText}>LiftLens</div>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Reset your password</Heading>
              <Text style={mainText}>
                {`We received a request to reset the password for the LiftLens account associated with ${emailTo}`} 
              </Text>
              <Section style={verificationSection}>
                <Button style={linkText} href={resetUrl}>
                  Reset Password
                </Button>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you were not expecting this email, you can safely ignore it.
                If you are concerned about your account&rsquo;s safety, please reply
                to this email to get in touch with us.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#fff',
  color: '#212121',
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const headerSection: React.CSSProperties = {
  backgroundColor: '#0B1215',
  display: 'table',
  padding: '20px 0',
  textAlign: 'center',
  width: '100%',
};

const headerText = {
  color: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
};

const linkText = {
  color: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  fontWeight: 'bold',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const verificationSection: React.CSSProperties = {
  backgroundColor: '#00D64E',
  borderRadius: '0.25rem',
  color: '#FFFFFF',
  fontSize: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  padding: '1rem 1.25rem',
  margin: 'auto',
  display: 'block',
  width: 'fit-content',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };

export default ResetPasswordEmail;
