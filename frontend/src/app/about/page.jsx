export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="text-5xl mb-5">🏆</div>

          <h1 className="text-4xl md:text-5xl font-bold">
            About TechPulse Awards
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-purple-100 leading-relaxed">
            Recognizing the technologies, tools, platforms, and innovations that
            power the future of software development.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Celebrating the technology shaping tomorrow
            </h2>

            <p className="mt-5 text-gray-600 leading-7 text-lg">
              TechPulse Awards is a community-driven technology voting platform
              designed to recognize the most influential tools, frameworks,
              cloud platforms, and software technologies shaping the future of
              development.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              Our goal is to provide developers, engineers, students, and
              technology enthusiasts with a fair and engaging platform where the
              community can recognize outstanding technologies and innovations
              within the software industry.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            The Platform
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            How TechPulse Awards Works
          </h2>

          <p className="mt-3 text-gray-500">
            Simple, secure, and community-driven.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
            <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              🔐
            </div>

            <h3 className="mt-5 font-semibold text-lg text-gray-900">
              Secure Login
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Email OTP authentication helps ensure that each participant has a
              verified account.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
            <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              🗳️
            </div>

            <h3 className="mt-5 font-semibold text-lg text-gray-900">
              Cast Your Vote
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Vote for your preferred technology within each available category.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
            <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              ⏱️
            </div>

            <h3 className="mt-5 font-semibold text-lg text-gray-900">
              Fair Voting
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Voting frequency limits help reduce duplicate and excessive voting
              activity.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
            <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              📊
            </div>

            <h3 className="mt-5 font-semibold text-lg text-gray-900">
              Live Rankings
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Follow category rankings and see how the community's votes are
              shaping the results.
            </p>
          </div>
        </div>
      </section>

      {/* VOTING */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🗳️</div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  How Voting Works
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Designed for fair community participation
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-4">
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-600">
                  Email OTP authentication ensures secure participation.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-600">
                  Users can vote once per category during the configured voting
                  interval.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-600">
                  Rankings are updated automatically as votes are submitted.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-600">
                  Duplicate and excessive voting attempts are restricted.
                </span>
              </li>
            </ul>
          </div>

          {/* SECURITY */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-8">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🛡️</div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Security</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Built with security in mind
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-gray-900">
                  JWT Authentication
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Protected user sessions
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-gray-900">Email OTP</p>
                <p className="text-sm text-gray-500 mt-1">Verified login</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-gray-900">Protected APIs</p>
                <p className="text-sm text-gray-500 mt-1">
                  Authenticated actions
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-gray-900">Vote Limits</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reduced spam activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">
              Built With
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Technology Stack
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <div className="rounded-xl bg-gray-50 border p-5">
              <p className="text-sm text-gray-500">Frontend</p>
              <p className="mt-2 font-semibold text-gray-900">
                Next.js + React
              </p>
              <p className="text-sm text-gray-500 mt-1">Tailwind CSS</p>
            </div>

            <div className="rounded-xl bg-gray-50 border p-5">
              <p className="text-sm text-gray-500">Backend</p>
              <p className="mt-2 font-semibold text-gray-900">
                Node.js + Express
              </p>
              <p className="text-sm text-gray-500 mt-1">REST APIs</p>
            </div>

            <div className="rounded-xl bg-gray-50 border p-5">
              <p className="text-sm text-gray-500">Database</p>
              <p className="mt-2 font-semibold text-gray-900">MySQL</p>
              <p className="text-sm text-gray-500 mt-1">
                Relational data management
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border p-5">
              <p className="text-sm text-gray-500">Authentication</p>
              <p className="mt-2 font-semibold text-gray-900">
                Email OTP + JWT
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Secure authentication
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
