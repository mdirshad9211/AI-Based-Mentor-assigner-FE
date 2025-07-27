const testimonials = [
  {
    text: '“Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.”',
    name: 'Leslie Alexander',
    username: '@lesliealexander',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: '“Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.”',
    name: 'Brenna Goyette',
    username: '@brennagoyette',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    logo: 'https://assets.vercel.com/image/upload/front/assets/design/savvycal-logo-dark.svg',
    logoAlt: 'SavvyCal',
  },
  {
    text: '“Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.”',
    name: 'Leonard Krasner',
    username: '@leonardkrasner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: '“Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.”',
    name: 'Michael Foster',
    username: '@michaelfoster',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    text: '“Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.”',
    name: 'Lindsay Walton',
    username: '@lindsaywalton',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    text: '“Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsam perferendis recusandae saepe corrupti.”',
    name: 'Tom Cook',
    username: '@tomcook',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    text: '“Consequatur ut atque. Itaque nostrum molestiae id veniam eos cumque. Ut quia eum fugit laborum autem inventore ut voluptate.”',
    name: 'Dries Vincent',
    username: '@driesvincent',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    text: '“Nam nesciunt dolorem dolor asperiores cum. Incidunt molestiae quis deleniti vitae ut in earum delectus iusto.”',
    name: 'Courtney Henry',
    username: '@courtneyhenry',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    text: '“Aliquid dolore praesentium ratione. Cumque ea officia repellendus laboriosam. Vitae quod id explicabo non sunt.”',
    name: 'Whitney Francis',
    username: '@whitneyfrancis',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: '“Temporibus ea molestiae impedit adipisci perspiciatis illo aliquid. Quis ut ratione et voluptatem et. Nostrum explicabo iste unde beatae.”',
    name: 'Emily Selman',
    username: '@emilyselman',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="relative isolate px-4 py-16 sm:py-24 lg:py-32 bg-gray-900">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2d193e] via-[#1e293b] to-[#ff80b5]/20" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-base font-semibold text-pink-400 mb-2">Testimonials</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">We have worked with<br className="hidden sm:block" />thousands of amazing people</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First column */}
          <div className="flex flex-col gap-6">
            <TestimonialCard {...testimonials[0]} dark />
            <TestimonialCard {...testimonials[3]} dark />
            <TestimonialCard {...testimonials[6]} dark />
          </div>
          {/* Center column */}
          <div className="flex flex-col gap-6">
            <TestimonialCard {...testimonials[1]} center dark />
            <TestimonialCard {...testimonials[4]} dark />
            <TestimonialCard {...testimonials[7]} dark />
          </div>
          {/* Third column */}
          <div className="flex flex-col gap-6">
            <TestimonialCard {...testimonials[2]} dark />
            <TestimonialCard {...testimonials[5]} dark />
            <TestimonialCard {...testimonials[8]} dark />
            <TestimonialCard {...testimonials[9]} dark />
          </div>
        </div>
      </div>
    </section>
  );
}

import TestimonialCard from './TestimonialCard';
