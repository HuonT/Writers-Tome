import { Topic } from './types';

export const worldBuildingDefinition = `World building is the foundation upon which your story stands. A well-crafted world adds depth and authenticity to your narrative, making it more immersive and believable for readers. This module will guide you through creating a rich, detailed world that enhances your story without overwhelming it.`;

export const worldBuildingTopics: Topic[] = [
  {
    id: 'world-size',
    title: 'World Size and Scale',
    content: `The size and scale of your world significantly impacts your story's scope and possibilities:

• Physical dimensions of the world
• Travel times between locations
• Population distribution and density
• Size of kingdoms, empires, or territories
• Scale of conflicts and events
• Communication limitations based on distance
• Impact of size on cultural isolation or interaction

Pro Tip: Consider starting with a single kingdom or culture before expanding your borders. Going deeper into one culture often creates a more immersive and focused story than trying to juggle multiple kingdoms and cultures. This approach allows you to:

• Develop rich, detailed cultural elements
• Create more nuanced character interactions
• Avoid overwhelming readers with too many different customs and traditions
• Maintain consistent worldbuilding rules
• Build stronger emotional connections to specific locations and customs

You can always expand your world in subsequent books once readers are invested in your core setting.`,
    exercise: {
      id: 'world-scale-mapping',
      instructions: 'Define the scale of your world and how it affects your story:\n1. Outline the rough dimensions of your world\n2. List key locations and their distances from each other\n3. Describe how travel time and distance impact your plot',
      isCompleted: false
    }
  },
  {
    id: 'environments',
    title: 'Environments and Geography',
    content: `The physical world your characters inhabit shapes their daily lives, challenges, and opportunities. Consider:

• Climate and weather patterns that affect daily life
• Natural resources and their distribution
• Physical barriers that separate regions or peoples
• How geography influences travel and communication
• Local flora and fauna unique to your world`,
    exercise: {
      id: 'environment-mapping',
      instructions: 'Create a brief description of your world\'s key geographical features and how they impact your story:',
      isCompleted: false
    }
  },
  {
    id: 'magic-system',
    title: 'Magic System',
    content: `A well-designed magic system can add depth and wonder to your world while maintaining believability. Consider:

• Rules and limitations of magic
• Cost or consequences of using magic
• How magic affects society and daily life
• Distribution of magical ability
• Magic's role in power structures
• Historical events involving magic
• Magical artifacts and their significance
• Training and learning methods
• Cultural attitudes toward magic
• Integration with technology or traditional practices

Remember: The most compelling magic systems often have clear rules, limitations, and consequences. This creates tension and prevents magic from becoming an easy solution to every problem.`,
    exercise: {
      id: 'magic-system-design',
      instructions: 'Design your world\'s magic system:\n1. Define the basic rules and limitations\n2. Describe the costs or consequences of using magic\n3. Explain how magic influences society\n4. List any significant magical artifacts or locations\n5. Outline how magic is learned or transmitted',
      isCompleted: false
    }
  },
  {
    id: 'culture',
    title: 'Culture and Society',
    content: `Culture emerges from a collection of agreed on ideas and stories that convey a sense of self. 

This sense is derived from stories of past struggles of the whole group that can form into hero myths and folktales, and gives a general sense of purpose in the present and for the future. 

A culture encompasses many interconnected aspects:

• Languages and communication styles
• Religious or spiritual beliefs
• Social customs and traditions
• Art and creative expression
• Music and oral traditions
• Folktales and mythology
• Cuisine and food customs
• Textiles and clothing
• Technologies and tools
• Agricultural or hunting practices
• Family and community structures
• Shared values and beliefs
• Historical narratives
• Ceremonies and rituals
• Educational practices

These elements work together to create a cohesive cultural identity that shapes how your characters view and interact with their world. Understanding these aspects helps create authentic, believable societies that enrich your story.`,
    exercise: {
      id: 'culture-development',
      instructions: 'Outline the main cultural elements that will feature in your story:',
      isCompleted: false
    }
  },
  {
    id: 'power-structure',
    title: 'Power and Leadership Structure',
    content: `Understanding how power works in your world is crucial for creating realistic conflicts and social dynamics:

• Government or ruling systems
• Social hierarchies and class systems
• Economic systems and trade
• Law enforcement and justice
• Military organization
• Political alliances and rivalries`,
    exercise: {
      id: 'power-mapping',
      instructions: 'Describe the power structures in your world and how they affect your story:',
      isCompleted: false
    }
  },
  {
    id: 'history',
    title: 'History and Lore',
    content: `A world's history adds depth and context to current events:

• Origin stories and creation myths
• Major historical events
• Famous historical figures
• Ancient civilizations or ruins
• Evolution of current power structures
• Historical conflicts and their lasting impact`,
    exercise: {
      id: 'history-development',
      instructions: 'Create a timeline of key historical events that influence your story:',
      isCompleted: false
    }
  },
  {
    id: 'crafts',
    title: 'Crafts and Occupations',
    content: `The way people make a living shapes society and daily life:

• Traditional crafts and skills
• Common professions
• Trade and commerce systems
• Technology level and its impact
• Education and apprenticeship systems
• Specialized roles (healers, artisans, etc.)`,
    exercise: {
      id: 'occupation-mapping',
      instructions: 'List the main occupations in your world and their significance to the story:',
      isCompleted: false
    }
  },
  {
    id: 'tensions',
    title: 'World Tensions',
    content: `Conflicts and tensions add depth and drive plot development:

• Cultural conflicts between groups
• Resource competitions
• Territorial disputes
• Ideological differences
• Class struggles
• Environmental challenges`,
    exercise: {
      id: 'tension-mapping',
      instructions: 'Identify the major tensions in your world and how they affect your plot:',
      isCompleted: false
    }
  }
];