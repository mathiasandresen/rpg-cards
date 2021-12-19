<script lang="ts" context="module">
  import type CardContentTypeDescriptor from '$model/card-content-type';
  import Dndspellblock from '$components/card/content-blocks/dndspellblock.svelte';
  import Dndstats from '$components/card/content-blocks/dndstats.svelte';
  import Text from '$components/card/content-blocks/text.svelte';

  const createCardContentTypes = <
    T extends readonly CardContentTypeDescriptor[] & Array<{ name: V }>,
    V extends string
  >(
    ...args: T
  ) => args;

  export const CARD_CONTENT_TYPES = createCardContentTypes(
    {
      name: 'text',
      description: 'Simple paragraph',
      params: [{ name: 'Text', description: 'Text', type: 'textarea' }],
      renderComponent: Text
    },
    {
      name: 'subtitle',
      description: 'Sligtly larger italics text',
      params: [
        { name: 'Subtitle', description: 'Subtitle text' },
        { name: 'Right-aligned', description: 'Additional right-aligned text', optional: true }
      ]
    },
    {
      name: 'rule',
      description: 'A horizontal line taking up full width',
      params: []
    },
    {
      name: 'property',
      description:
        'A property with a bold name and normal description - if spanning more than one line, description is indented.',
      params: [
        { name: 'Name', description: 'Propety name (bolded)' },
        { name: 'Description', description: 'Propety description' }
      ]
    },
    {
      name: 'description',
      description: 'Same as `property` but with no indentation and name is italicized.',
      params: [
        { name: 'Name', description: 'Description name (bolded, italicized)' },
        { name: 'Description', description: 'Description description' }
      ]
    },
    {
      name: 'section',
      description: 'Section header',
      params: [
        { name: 'Section name', description: 'Section name' },
        { name: 'Right-aligned', description: 'Additional right-aligned text', optional: true }
      ]
    },
    {
      name: 'boxes',
      description: 'Empty boxes',
      params: [
        { name: 'Amount', description: 'Amount of boxes', type: 'number' },
        { name: 'Size', description: 'Size of the boxes', optional: true }
      ]
    },
    {
      name: 'fill',
      description: 'Empty area taking up available space',
      params: []
    },
    {
      name: 'bullet',
      description: 'Bulleted text',
      params: [{ name: 'Text', description: 'Text' }]
    },
    {
      name: 'picture',
      description: 'A picture from an url',
      params: [
        { name: 'URL', description: 'URL of the picture' },
        { name: 'Height', description: 'Height of the picture in pixels' }
      ]
    },
    {
      name: 'dndstats',
      description: 'A Dungeons & Dragons stat block',
      params: [
        { name: 'Str', description: 'Strength score', type: 'number' },
        { name: 'Dex', description: 'Dexterity score', type: 'number' },
        { name: 'Con', description: 'Constitution score', type: 'number' },
        { name: 'Int', description: 'Intelligence score', type: 'number' },
        { name: 'Wis', description: 'Wisdom score', type: 'number' },
        { name: 'Cha', description: 'Charisma score', type: 'number' }
      ],
      renderComponent: Dndstats
    },
    {
      name: 'dndspellblock',
      description: 'A Dungeons & Dragons spell card block',
      params: [
        { name: 'Casting', description: 'Casting time' },
        { name: 'Range', description: 'Range' },
        { name: 'Components', description: 'Components' },
        { name: 'Duration', description: 'Duration' }
      ],
      renderComponent: Dndspellblock
    }
  );

  export type CardContentTypeV2 = typeof CARD_CONTENT_TYPES[number]['name'];

  const CARD_CONTENT_TYPE_DESCRIPTOR_MAP = new Map<CardContentTypeV2, CardContentTypeDescriptor>();

  CARD_CONTENT_TYPES.forEach((descriptor) => {
    CARD_CONTENT_TYPE_DESCRIPTOR_MAP.set(descriptor.name, descriptor);
  });

  export function getContentTypeDescriptor(type: CardContentTypeV2): CardContentTypeDescriptor {
    return CARD_CONTENT_TYPE_DESCRIPTOR_MAP.get(type);
  }
</script>
