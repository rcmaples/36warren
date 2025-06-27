export default function ExecutiveSummary() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4 font-['Arial_Black'] tracking-wide">
          Executive Summary
        </h2>
        <p className="text-xl font-semibold uppercase tracking-wider text-red-500">
          Municipal Storm Drain Infrastructure Failure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Case Overview */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Case Overview
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            A systematic failure of municipal storm drain infrastructure has
            resulted in repeated property flooding, significant financial
            damages, and ongoing safety hazards. Despite multiple reports and
            professional assessments, city officials have failed to address the
            root cause of the infrastructure failure.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Timeline
          </h3>
          <ul className="space-y-3">
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">March 2024:</strong> Initial complaint filed
            </li>
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">April 2024:</strong> Inadequate city inspection
            </li>
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">June 2024:</strong> Catastrophic drainage failure
            </li>
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">August 2024:</strong> Insufficient repair attempts
            </li>
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">September 2024:</strong> Continued flooding events
            </li>
            <li className="text-base text-gray-700">
              <strong className="font-semibold text-gray-800">November 2024:</strong> Legal action initiated
            </li>
          </ul>
        </div>

        {/* Documented Damages */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Documented Damages
          </h3>
          <ul className="space-y-2">
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Basement flooding with contaminated water
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Foundation structural damage
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Electrical system compromise
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Personal property destruction
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Landscaping and yard damage
            </li>
          </ul>
        </div>

        {/* Financial Impact */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Financial Impact
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-base">
              <span className="text-gray-700">Engineering Assessment:</span>
              <span className="font-semibold text-gray-900 text-right">$45,000 Replacement</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-gray-700">Property Damage:</span>
              <span className="font-semibold text-gray-900">Ongoing</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-gray-700">Legal Costs:</span>
              <span className="font-semibold text-gray-900">Accumulating</span>
            </div>
          </div>
        </div>

        {/* Municipal Negligence */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Municipal Negligence
          </h3>
          <ul className="space-y-2">
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Failed proper inspection
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Ignored engineering recommendations
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Implemented inadequate fixes
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Refused to acknowledge failure
            </li>
            <li className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0">
              Delayed emergency response
            </li>
          </ul>
        </div>

        {/* Evidence Documentation */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            Evidence
          </h3>
          <div className="flex justify-around text-center">
            <div className="text-gray-800">
              <span className="block text-4xl font-black text-red-500 font-['Arial_Black']">15+</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Photos</span>
            </div>
            <div className="text-gray-800">
              <span className="block text-4xl font-black text-red-500 font-['Arial_Black']">6</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Events</span>
            </div>
            <div className="text-gray-800">
              <span className="block text-4xl font-black text-red-500 font-['Arial_Black']">8</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="mt-12 bg-gray-800/50 rounded-lg p-8 text-center border border-red-500/30">
        <h3 className="text-2xl font-bold text-white mb-4 font-['Arial_Black']">
          Conclusion
        </h3>
        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-lg">
          The evidence demonstrates a clear pattern of municipal negligence in
          maintaining critical infrastructure, resulting in preventable property
          damage. Immediate action is required to address the infrastructure
          failure and compensate for damages.
        </p>
      </div>
    </div>
  );
}
