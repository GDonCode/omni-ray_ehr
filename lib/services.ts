export interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
  details: string;
  when: string[];
  icon?: string;
}

export const servicesByCategory = {
  preventive: [
    { 
      name: 'New Patient Examination', 
      duration: '30 min', 
      price: '2,500',
      description: 'Complete oral health assessment to evaluate your teeth and gums.',
      details: 'Our experienced dentists examine your teeth, gums, and overall oral health. We identify any issues early and create a personalized treatment plan.',
      when: ['First visit', 'Annual check-up', 'Dental concerns or pain', 'Second opinion needed']
    },
    { 
      name: 'Routine Dental Cleaning', 
      icon: '/service_icons/tooth-cleaning_036d6d.png',
      duration: '60 min', 
      price: '15,000',
      description: 'Professional cleaning to remove plaque and tartar buildup.',
      details: 'Our hygienists thoroughly clean your teeth, removing hardened plaque that regular brushing cannot reach. We polish your teeth and provide personalized oral care advice.',
      when: ['Every 6 months', 'Prevent cavities and gum disease', 'Freshen breath and brighten smile']
    },
    {
      name: 'Deep Cleaning (Scaling & Root Planing)',
      duration: '60–90 min',
      price: '25,000',
      description: 'Treatment for gum disease below the gumline.',
      details: 'Thorough cleaning beneath the gumline to remove bacteria and tartar buildup around tooth roots.',
      when: ['Gum disease diagnosis', 'Deep gum pockets', 'Persistent bleeding gums']
    },
    {
      name: 'Fluoride Treatment',
      duration: '5 min',
      price: '3,000',
      description: 'Strengthen enamel and prevent cavities.',
      details: 'Professional fluoride application to reinforce tooth enamel and reduce risk of decay.',
      when: ['High cavity risk', 'Sensitive teeth', 'Children and teens']
    }
  ],
  restorative: [
    { 
      name: 'Tooth Filling', 
      duration: '20 min per filling', 
      price: '10,000',
      description: 'Repair cavities with durable composite fillings.',
      details: 'We remove decay and fill the cavity with tooth-colored composite material that blends seamlessly with your natural teeth.',
      when: ['Cavity or tooth decay', 'Sensitivity to hot/cold', 'Pain when chewing']
    },
    { 
      name: 'Root Canal Treatment', 
      duration: 'May require multiple visits', 
      price: '45,000',
      description: 'Treatment to remove infection and save your tooth.',
      details: 'When tooth pulp becomes infected, root canal treatment removes the infection, cleans the canal, and seals it using modern, comfortable techniques.',
      when: ['Severe toothache', 'Prolonged sensitivity', 'Swollen or tender gums', 'Darkening of tooth']
    },
    {
      name: 'Simple Tooth Extraction',
      duration: '20–40 min',
      price: '15,000',
      description: 'Removal of damaged or non-restorable teeth.',
      details: 'Gentle extraction of a tooth that cannot be repaired due to decay or damage.',
      when: ['Severe decay', 'Broken tooth', 'Overcrowding']
    },
    {
      name: 'Surgical Extraction',
      duration: '45–60 min',
      price: '35,000',
      description: 'Complex removal of impacted or broken teeth.',
      details: 'Minor surgical procedure to remove teeth that are impacted or not fully erupted.',
      when: ['Impacted tooth', 'Broken at gum line', 'Failed simple extraction']
    },
    {
      name: 'Wisdom Tooth Removal',
      duration: '45–90 min',
      price: '40,000',
      description: 'Removal of impacted or problematic wisdom teeth.',
      details: 'Extraction of third molars to prevent infection, crowding, or pain.',
      when: ['Jaw pain', 'Swelling', 'Crowding', 'Impaction seen on X-ray']
    },
    {
      name: 'Dental Crown',
      duration: '2 visits',
      price: '60,000',
      description: 'Restore strength and function to damaged teeth.',
      details: 'Custom-made cap placed over a weakened tooth to restore shape, strength, and appearance.',
      when: ['Large filling failure', 'After root canal', 'Cracked tooth']
    },
    {
      name: 'Dental Bridge',
      duration: '2 visits',
      price: '120,000',
      description: 'Replace one or more missing teeth.',
      details: 'Fixed prosthetic anchored to adjacent teeth to restore chewing function and aesthetics.',
      when: ['Missing teeth', 'Difficulty chewing', 'Shifting teeth']
    },
    { 
      name: 'Dentures Consultation', 
      duration: '30 min', 
      price: '13,000',
      description: 'Evaluation for full or partial dentures.',
      details: 'We assess your oral health and discuss custom denture options to restore comfort, chewing ability, and confidence.',
      when: ['Missing multiple teeth', 'Full tooth loss', 'Existing dentures need replacement']
    }
  ],
  cosmetic: [
    {
      name: 'Teeth Whitening',
      duration: '60 min',
      price: '35,000',
      description: 'Professional whitening for a brighter smile.',
      details: 'High-concentration whitening gel activated in-office for immediate visible results.',
      when: ['Stained teeth', 'Yellowing', 'Special events']
    },
    {
      name: 'Porcelain Veneers',
      duration: '2–3 visits',
      price: '85,000 per tooth',
      description: 'Enhance shape, color, and alignment.',
      details: 'Thin porcelain shells bonded to the front of teeth for a flawless smile transformation.',
      when: ['Chipped teeth', 'Gaps', 'Severe discoloration']
    },
    {
      name: 'Smile Design Consultation',
      duration: '45–60 min',
      price: '15,000',
      description: 'Personalized aesthetic smile planning.',
      details: 'Digital planning session analyzing facial proportions, tooth shape, and color to design your ideal smile.',
      when: ['Full smile makeover', 'Before veneers', 'Cosmetic improvement goals']
    }
  ]
} satisfies Record<string, Service[]>;

export const serviceCategoryLabels: Record<keyof typeof servicesByCategory, string> = {
  preventive: 'Preventive Care',
  restorative: 'Restorative Care',
  cosmetic: 'Cosmetic Care',
};

// Flat list of every service name, useful for dropdowns/validation.
export const allServiceNames: string[] = Object.values(servicesByCategory)
  .flat()
  .map((service) => service.name);