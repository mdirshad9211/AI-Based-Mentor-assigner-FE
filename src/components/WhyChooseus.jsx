import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Matching',
    description:
      'Advanced algorithms automatically match tickets to the most qualified mentors based on skills, expertise, and current workload for optimal assignment.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Skill-Based Routing',
    description:
      'Smart routing system analyzes ticket content and mentor skills to ensure each issue reaches the right expert, reducing resolution time significantly.',
    icon: LockClosedIcon,
  },
  {
    name: 'Real-Time Assignment',
    description:
      'Instant ticket assignment upon creation with automatic load balancing to prevent mentor overload and ensure fair distribution of work.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Comprehensive Tracking',
    description:
      'Complete ticket lifecycle management with detailed analytics, performance metrics, and user feedback to continuously improve the system.',
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Why Choose Our Platform</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-100 sm:text-5xl lg:text-balance">
            Everything you need for intelligent ticket management
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Our AI-powered ticket assignment system revolutionizes support workflows by intelligently matching requests 
            with the most qualified mentors, ensuring faster resolution times and improved user satisfaction.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-100">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
