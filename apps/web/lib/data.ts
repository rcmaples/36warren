// Legacy mock data (keeping for fallback/development)
export const mockTimelineData = [
  {
    date: '2024.03.15',
    title: 'INITIAL_REPORT',
    description:
      'First report filed with city regarding visible storm drain deterioration and standing water on property.',
    fullDescription:
      'Initial contact made with City Public Works Department regarding visible deterioration of storm drain infrastructure adjacent to property. Standing water observed in yard following moderate rainfall. City representative acknowledged receipt of complaint and promised inspection within 5-7 business days. Photographic evidence submitted showing early signs of drain line compromise and water pooling. Case number assigned: SW-2024-0315-001.',
    severity: 'medium',
    people: [
      {
        _id: 'person1',
        name: 'John Smith',
        jobTitle: 'Public Works Supervisor',
        department: 'City Public Works',
        email: 'j.smith@city.gov'
      },
      {
        _id: 'person2', 
        name: 'Sarah Johnson',
        jobTitle: 'Inspector',
        department: 'Infrastructure',
        email: 's.johnson@city.gov'
      }
    ],
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
    people: [
      {
        _id: 'person1',
        name: 'John Smith',
        jobTitle: 'Public Works Supervisor',
        department: 'City Public Works',
        email: 'j.smith@city.gov'
      },
      {
        _id: 'person3',
        name: 'Mike Wilson',
        jobTitle: 'Emergency Response Coordinator',
        department: 'Emergency Services',
        email: 'm.wilson@city.gov'
      },
      {
        _id: 'person4',
        name: 'Lisa Chen',
        jobTitle: 'Structural Engineer', 
        department: 'Engineering',
        email: 'l.chen@city.gov'
      },
      {
        _id: 'person5',
        name: 'David Brown',
        jobTitle: 'Property Inspector',
        department: 'Building & Safety',
        email: 'd.brown@city.gov'
      },
      {
        _id: 'person6',
        name: 'Amy Rodriguez',
        jobTitle: 'Claims Adjuster',
        department: 'Insurance',
        email: 'a.rodriguez@insurance.com'
      },
      {
        _id: 'person7',
        name: 'Tom Anderson',
        jobTitle: 'Contractor',
        department: 'Emergency Repairs',
        email: 't.anderson@repairs.com'
      }
    ],
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

// Utility functions for processing Sanity data
import { TimelineEntry } from './types';

// Format date from ISO string to YYYY-MM-DD
export function formatEntryDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  } catch (error) {
    console.warn('Invalid date format:', dateString);
    return dateString; // Return original if parsing fails
  }
}

// Simple image conversion without importing image utilities (to avoid build errors)
function convertSanityImageToTimelineImage(sanityImage: any): any {
  if (!sanityImage?.asset?._ref) {
    return null;
  }

  try {
    // Basic Sanity image URL construction
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mrsdi6mo';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '36warren';
    const assetId = sanityImage.asset._ref;
    
    // Extract the asset ID parts
    const [, id, dimensions, format] = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/) || [];
    
    if (id && dimensions && format) {
      const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
      
      return {
        url: `${baseUrl}?w=800&h=600&fit=max&auto=format`,
        caption: sanityImage.alt || ''
      };
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to process Sanity image:', error);
    return null;
  }
}

// Convert Sanity entry to TimelineEntry format for compatibility
export function processSanityEntry(sanityEntry: any): TimelineEntry {
  const processedImages = sanityEntry.gallery
    ?.map(convertSanityImageToTimelineImage)
    .filter(Boolean) || [];

  // Process people data
  const processedPeople = sanityEntry.people || [];

  return {
    _id: sanityEntry._id,
    name: sanityEntry.name,
    date: formatEntryDate(sanityEntry.date),
    shortDescription: sanityEntry.shortDescription,
    fullDescription: sanityEntry.fullDescription,
    impact: sanityEntry.impact,
    gallery: sanityEntry.gallery,
    people: processedPeople,
    // For backward compatibility with existing components that expect 'images'
    images: processedImages,
    // Map fields for backward compatibility
    title: sanityEntry.name,
    description: sanityEntry.shortDescription,
    severity: sanityEntry.impact === 'low' ? 'medium' : sanityEntry.impact || 'medium'
  } as any;
}
