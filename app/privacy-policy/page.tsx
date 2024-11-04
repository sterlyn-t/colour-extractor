import React from "react";
import Link from "next/link";
import { IconShieldLock, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="h-full p-6 md:p-12">
      <div className="max-w-3xl mx-auto p-8">
        <div className="flex items-center space-x-2 mb-6">
          <IconShieldLock size={28} className="text-blue-600" />
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>

        <p className="mb-4 text-muted-foreground">
          Your privacy is important to us. This privacy policy outlines the
          types of information we collect, how we use it, and the steps we take
          to protect your data.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Information Collection
        </h2>
        <p className="mb-4 text-muted-foreground">
          We do not store or share any images that are uploaded to our app. All
          images are processed locally on your device and are not transmitted to
          any external servers.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Use of Data</h2>
        <p className="mb-4 text-muted-foreground">
          The data used to generate color palettes is extracted directly from
          your input (URL or uploaded image) and remains on your device. No data
          is stored or shared externally.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Security</h2>
        <p className="mb-4 text-muted-foreground">
          We prioritize the security of your data. Our app is designed to
          process everything on your device, ensuring that your information
          remains private and secure.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          4. Changes to This Policy
        </h2>
        <p className="mb-4 text-muted-foreground">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>

        <div className="mt-8">
          <Link href="/" passHref>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-2 text-blue-600"
            >
              <IconArrowLeft size={20} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
