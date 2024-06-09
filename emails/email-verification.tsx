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

interface EmailVerificationEmailProps {
  verifyUrl?: string;
}

export const EmailVerificationEmail = ({
  verifyUrl,
}: EmailVerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>LiftLens Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={headerSection}>
              <div style={headerText}>LiftLens</div>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for signing up to LiftLens. To continue creating your
                account, please verify your email by selecting the link below.
              </Text>
              <Section style={verificationSection}>
                <Button style={linkText} href={verifyUrl}>
                  Start Lifting
                </Button>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you were not expecting this email, you can safely ignore it.
                If you are concerned about your account's safety, please reply
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

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
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

// const verificationSection: React.CSSProperties = {
//   display: 'table',
//   textAlign: 'center',
// };

const verificationSection: React.CSSProperties = {
  backgroundColor: '#00D64E',
  borderRadius: '0.25rem', // equivalent to Tailwind's 'rounded'
  color: '#FFFFFF', // equivalent to Tailwind's 'text-white'
  fontSize: '12px', // equivalent to Tailwind's 'text-[12px]'
  textDecoration: 'none', // equivalent to Tailwind's 'no-underline'
  textAlign: 'center', // equivalent to Tailwind's 'text-center'
  padding: '1rem 1.25rem', // equivalent to Tailwind's 'px-5 py-3'
  margin: 'auto', // centers the button horizontally
  display: 'block', // necessary for margin: auto to work
  width: 'fit-content', // fits the width to the content
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };

export default EmailVerificationEmail;
