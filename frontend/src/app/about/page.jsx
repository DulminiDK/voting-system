export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About TechPulse Awards</h1>

      <p className="text-gray-600 text-lg mb-8">
        TechPulse Awards is a community-driven technology voting platform
        designed to recognize the most influential tools, frameworks, cloud
        platforms, and software technologies shaping the future of development.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>

          <p className="text-gray-600">
            The mission of TechPulse Awards is to provide developers, engineers,
            students, and technology enthusiasts with a fair and engaging
            platform to recognize outstanding technologies and innovations
            within the software industry.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How Voting Works</h2>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Email OTP authentication ensures secure participation.</li>
            <li>
              Users can vote once per category during the configured voting
              interval.
            </li>
            <li>Real-time rankings are updated automatically.</li>
            <li>Duplicate and spam voting attempts are restricted.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Technology Stack</h2>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Frontend: Next.js, React, Tailwind CSS</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Database: MySQL</li>
            <li>Authentication: Email OTP + JWT</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Security Features</h2>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>JWT-based authentication</li>
            <li>Protected voting endpoints</li>
            <li>OTP verification</li>
            <li>Rate-limited voting system</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
