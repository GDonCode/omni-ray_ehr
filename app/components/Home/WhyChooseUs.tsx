// components/WhyChooseUs.tsx
import React from 'react';
import { Trophy, User, Zap } from 'lucide-react';

interface WhyChooseUsProps {
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  tt_wellingtons: { className: string };
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  inter_heading,
  tt_wellingtons_demi,
  tt_wellingtons
}) => {
  const features: Feature[] = [
    {
      icon: <Trophy className="size-7 mb-2 text-[#f6d212]" fill="currentColor" />,
      title: 'Expert Dentists',
      description: 'Our {0} professionals bring years of experience and {1} to every appointment, ensuring you receive the {2} of care.',
      highlights: ['skilled', 'advanced training', 'highest standard']
    },
    {
      icon: <User className="size-7 mb-2 text-[#f6d212]" fill="currentColor" />,
      title: 'Personalised Experience',
      description: 'We take the time to {0}, creating a custom treatment plan that fits your lifestyle and goals.',
      highlights: ['understand your needs and concerns']
    },
    {
      icon: <Zap className="size-7 mb-2 text-[#f6d212]" fill="currentColor" />,
      title: 'Cutting-Edge Technology',
      description: 'From digital X-rays to pain-free laser treatments, we invest in the {0} to make your visits faster, safer, and more comfortable.',
      highlights: ['latest dental technology']
    }
  ];

  const renderDescription = (description: string, highlights: string[]) => {
    let result = description;
    highlights.forEach((highlight, index) => {
      result = result.replace(
        `{${index}}`,
        `<span class="${tt_wellingtons_demi.className}">${highlight}</span>`
      );
    });
    return result;
  };

  return (
    <section className="pb-14 z-10 lg:w-full lg:pt-0 mx-auto p-6 bg-[#EAF3F7]">
      <div className="lg:w-[95%] w-full">
        {/* Badge */}
        <p className={`${inter_heading.className} mx-auto w-fit text-[#181818] bg-[#ffdf20] px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold tracking-wide`}>
          Why Choose Us
        </p>

        {/* Heading */}
        <h2 className={`${tt_wellingtons_demi.className} text-[2.2rem] lg:text-4xl font-bold text-center text-[#036d6d] tracking-wide`}>
          The Aurelia Dental Difference
        </h2>

        {/* Subheading */}
        <p className={`${tt_wellingtons.className} text-xl text-[#181818] mt-6 leading-8 font-medium lg:text-center`}>
          We deliver exceptional care through our commitment to{' '}
          <span className={`${tt_wellingtons_demi.className} font-extrabold`}>excellence</span>, advanced{' '}
          <span className={`${tt_wellingtons_demi.className} font-extrabold`}>technology</span>, and{' '}
          <span className={`${tt_wellingtons_demi.className} font-extrabold`}>patient-centered</span> approach.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col lg:flex-row lg:px-4 lg:py-4 lg:gap-14 gap-10 mt-10">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-[#058080] rounded-md text-center mx-auto p-4 flex flex-col items-center shadow-md hover:shadow-lg hover:scale-104 transition-all duration-300 border-2 border-[#805D93]/30"
          >
            {feature.icon}
            <h3 className={`${tt_wellingtons_demi.className} text-2xl font-medium text-[#FAF9F6] mb-5`}>
              {feature.title}
            </h3>
            <p 
              className={`${tt_wellingtons.className} text-[#FAF9F6] leading-8 text-[1.15rem]`}
              dangerouslySetInnerHTML={{ 
                __html: renderDescription(feature.description, feature.highlights) 
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;