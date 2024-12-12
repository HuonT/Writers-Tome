import { Topic } from './types';

export const plotDefinition = `If a reader gets to the end of your book and can't easily say what the book was about, they are very unlikely to feel satisfied or leave a 5-star review.

Plot technically refers to an overarching sequence of events which creates the storyline and forms the structure of the story. However, it is crucial to be able to distill your plot down to one simple premise. Therefore, we will break the subject of plot into two parts starting with understanding plot as premise, before moving on to story structure.`;

export const plotTopics: Topic[] = [
  {
    id: 'premise',
    title: 'Story Premise',
    content: 'Understanding your story premise is crucial for developing a compelling narrative.',
    sections: [
      {
        id: 'understanding-premise',
        title: 'Understanding Plot as a Writer',
        content: `The plot is the one common thing that affects the decisions of all the main characters. It is the driving force that all characters have in common.

You can think of the plot as simply a device in writing to focus all your characters' motivations, the premise being the main objective, while the "actual story" is the actions the characters take, i.e., how the characters respond to the plot tension and interact with each other throughout the progressing narrative and resolution.`
      },
      {
        id: 'lotr-exercise',
        title: "Let's Practice with an Example",
        content: "Let's use The Lord of the Rings as an example to understand how plot works in practice.",
        exercise: {
          id: 'write-lotr-plot',
          instructions: 'Write down how you would describe the plot of The Lord of the Rings trilogy.',
          isCompleted: false
        },
        answer: `The Lord of the Rings plot: The Ring is a force of dark power and must be destroyed/controlled.

That's it. A simple one-line premise.

That is the one common thing that drives the actions and decisions of each character, both bad and good.

The bad want to take control of/possess the ring.

The good must destroy it because it cannot be controlled or used for good.

Though there is a broad struggle between good and evil in the series, the plot of the ring is the underlying driving factor. Having a defined plot element will help make your story gripping and suspenseful because it can be used to give characters individual motives and drive actions on a broad scale.

Now, think about how the example plot in Lord of the Rings is woven into the motives of each character: Frodo as the main protagonist—reluctant at first to get involved but impacted all the same as Gandalf thrusts the quest upon him, Samwise as the loyal companion supporting the hero, Gandalf as the wise mentor, Gollum, Sauron, Saruman, etc. They each have individual character traits, but the one common factor they make decisions about is taking the Ring of Power to be destroyed or possessing it (the precious) to use its power.

Plots are often similar in fantasy. It is the characters and world that make each story unique. For example, many fantasy and sci-fi plots revolve around controlling some source of power, whether it be the Ring in LOTR, the Spice in Dune, the Iron Throne in A Game of Thrones, or some other magic object or knowledge, etc. The purpose of understanding plot in this stage is not to go into the details of designing your plot sequence of events, but rather to understand how plot should relate to character motivations to help define the plot while making your characters relevant, and to help you gain clarity of what a clear story premise is.`
      },
      {
        id: 'character-relevance',
        title: 'Relevance to Characters',
        content: `As a writer, it is hugely impactful in creating strong characters that feel relevant when you have a defined plot that is clearly the main common force impacting each character from the earliest stages of your story.

This creates clarity for your reader regarding what the book is about, and straight away your reader can be gripped by your characters' actions and decisions, always anticipating what the outcome might be. If a reader gets to the end of your book and can't say what the book was about, they are very unlikely to feel satisfied or leave a 5-star review.

Weaving in a unique plot that drives a series of events and decisions made by your characters is the real work of your imagination. This is a large part of what being a creative writer is, so I leave it to you to develop your own unique story, however, we will go through more framework in the story structure and characters sections.`
      },
      {
        id: 'main-motivation',
        title: 'Main Motivation',
        content: `As you should now see, a strong plot is one that ties all of the characters together, and it can be best shown by making it the primary motive of each character as it applies to them respectively.

The sooner the plot can be shown to be the common motivator of all your characters, the sooner your readers will be gripped by the narrative and the characters will begin to gain emotional attachment to the reader.`
      },
      {
        id: 'first-chapter-tips',
        title: 'Tips for Your First Chapter',
        content: `Your first chapter should accomplish the following:

• Introduce your main character in their current circumstances
• Show what their motive to the plot is (why and how it will affect them) and hint at what their role will be that will bring about change. This main character motive needs to show the reader what the main struggle of the story will be about, e.g., earn their liberty, take back a stolen power, find something that has been lost, save their village from a looming threat, etc.
• While introducing the character and motives, the first chapter should be able to begin hinting at the struggles of achieving their goal and providing world building and setting to start creating a general feel for the way the world is.`
      }
    ]
  },
  {
    id: 'my-plot',
    title: 'My Plot',
    content: `Now it's time to write down your own plot. If you still don't know what your plot will be, you can always come back and refine it as you gain clarity through the rest of the planning stage.`
  },
  {
    id: 'structure',
    title: 'Story Structure',
    content: 'Understanding story structure helps you organize your plot effectively and maintain reader engagement.',
    sections: [
      {
        id: 'structure-overview',
        title: 'Story Structure Overview',
        content: `A well-structured story is like a journey that takes your readers through a series of connected events, each building upon the last to create a satisfying narrative experience. The structure serves as a framework to organize your plot elements and character development in a way that maximizes emotional impact and maintains reader engagement.`,
        component: 'StoryStructureContent'
      }
    ]
  }
];