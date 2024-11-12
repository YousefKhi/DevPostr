import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://DevPostr.com
// - Name: DevPostr
// - Contact information: yousefKhi@outlook.com
// - Description: a autmated tweet generator for developers using there git comments
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://devpostr/privacy-policy
// - Governing Law: Canada
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Terms & Services for DevPostr

Effective Date: November 8, 2024

Welcome to DevPostr! These Terms & Services govern your use of our website, https://devpostr.com. By accessing or using DevPostr, you agree to comply with these terms.

1. Use of Service

DevPostr is an automated tweet generator designed for developers, utilizing data from Git comments to create content. Your use of our services is subject to compliance with these Terms & Services.

2. User Data

When you use DevPostr, we collect your name, email, and payment information for order processing purposes. For details on data handling, please refer to our Privacy Policy.

3. Cookies

We use cookies to improve your experience on our site. Cookies are small data files stored on your device and do not contain personally identifiable information.

4. Modifications to the Terms

We may update these Terms & Services occasionally. If changes are made, we will notify you via email.

5. Governing Law

These Terms & Services are governed by the laws of Canada. Any disputes arising out of or related to your use of DevPostr will be resolved under Canadian law.

6. Contact Information

For questions about these Terms & Services, please contact us at yousefKhi@outlook.com.

Thank you for using DevPostr!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
