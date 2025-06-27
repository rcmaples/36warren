export interface TimelineImage {
  url: string;
  caption: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  fullDescription: string;
  severity: 'medium' | 'high' | 'critical';
  images?: TimelineImage[];
}

export const timelineData: TimelineEntry[] = [
  {
    date: '2024.03.15',
    title: 'INITIAL_REPORT',
    description:
      'First report filed with city regarding visible storm drain deterioration and standing water on property.',
    fullDescription:
      'Initial contact made with City Public Works Department regarding visible deterioration of storm drain infrastructure adjacent to property. Standing water observed in yard following moderate rainfall. City representative acknowledged receipt of complaint and promised inspection within 5-7 business days. Photographic evidence submitted showing early signs of drain line compromise and water pooling. Case number assigned: SW-2024-0315-001.',
    severity: 'medium',
    images: [
      {
        url: '/placeholder.svg?height=400&width=600&text=Initial+drain+deterioration',
        caption: 'Initial visible deterioration of storm drain access point',
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=Standing+water+in+yard',
        caption: 'Standing water in yard after moderate rainfall',
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=City+complaint+form',
        caption: 'Official complaint form submitted to Public Works',
      },
    ],
  },
  {
    date: '2024.04.22',
    title: 'FAILED_INSPECTION',
    description:
      'City inspector arrived but failed to properly assess the underground infrastructure. Superficial visual inspection only.',
    fullDescription:
      "City inspector conducted what can only be described as a cursory visual inspection of the storm drain access point. No underground assessment was performed despite clear evidence of subsurface issues. Inspector claimed 'no immediate concerns' and recommended 'monitoring the situation.' Failed to use proper diagnostic equipment or follow standard inspection protocols. Property owner requested more thorough investigation but was dismissed. This inadequate inspection directly contributed to the worsening of conditions over the following months.",
    severity: 'high',
  },
  {
    date: '2024.06.08',
    title: 'DRAINAGE_FAILURE',
    description:
      'Complete drainage failure during heavy rainfall. Significant flooding of property basement and foundation damage observed.',
    fullDescription:
      'Following heavy rainfall, complete failure of storm drainage system resulted in catastrophic flooding of property. Basement flooded with contaminated water, causing damage to electrical systems, stored belongings, and structural elements. Foundation showed signs of water damage and potential undermining. Emergency call placed to city services resulted in delayed response. City crew arrived 6 hours after initial call, by which time damage was extensive. Crew acknowledged that earlier proper inspection could have prevented this outcome.',
    severity: 'critical',
    images: [
      {
        url: '/placeholder.svg?height=400&width=600&text=Flooded+basement',
        caption: 'Basement flooding with contaminated storm water',
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=Foundation+damage',
        caption: 'Foundation damage from water undermining',
      },
    ],
  },
  {
    date: '2024.08.12',
    title: 'INADEQUATE_RESPONSE',
    description:
      "City's temporary 'fix' involved surface patching only. Underground infrastructure issues remain unaddressed.",
    fullDescription:
      'City Public Works response to the flooding incident was wholly inadequate. Rather than addressing the root cause of the storm drain failure, crews performed only surface-level patching of visible damage. Underground infrastructure remained compromised. Property owner presented engineering assessment recommending complete line replacement, but city officials dismissed these findings. Temporary measures implemented were insufficient and failed to prevent continued water intrusion during subsequent rainfall events.',
    severity: 'high',
  },
  {
    date: '2024.09.30',
    title: 'CONTINUED_PROBLEMS',
    description:
      'Repeated flooding events continue. City refuses to acknowledge systemic infrastructure failure despite mounting evidence.',
    fullDescription:
      "Despite multiple documented flooding events and professional engineering assessments, city officials continue to deny responsibility for systemic storm drain infrastructure failure. Property has experienced three additional flooding incidents, each causing cumulative damage to foundation, landscaping, and personal property. City's position remains that these are 'isolated incidents' despite clear pattern of infrastructure neglect. Legal consultation initiated to explore options for recovery of damages and proper infrastructure repair.",
    severity: 'critical',
    images: [
      {
        url: '/placeholder.svg?height=400&width=600&text=Repeat+flooding',
        caption: "Continued flooding after city's inadequate repairs",
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=Engineering+report',
        caption:
          'Professional engineering assessment of infrastructure failure',
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=Damage+documentation',
        caption: 'Cumulative property damage documentation',
      },
      {
        url: '/placeholder.svg?height=400&width=600&text=Legal+correspondence',
        caption: 'Legal correspondence with city regarding liability',
      },
    ],
  },
  {
    date: '2024.11.18',
    title: 'ESCALATION',
    description:
      'Formal legal notice served to city. Engineering report confirms complete infrastructure failure requiring immediate replacement.',
    fullDescription:
      "Following months of inadequate city response and continued property damage, formal legal notice has been served demanding immediate action and compensation for damages. Independent engineering report conclusively demonstrates that the storm drain infrastructure has completely failed and poses ongoing risk to property and public safety. Report recommends immediate replacement of entire drain line section at estimated cost of $45,000. City's previous 'repairs' are documented as substandard and potentially dangerous. Case now under legal review with potential for litigation if city continues to refuse proper remediation.",
    severity: 'critical',
  },
];
