import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'pricing', title: 'Pricing'},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Honey', value: 'honey'},
          {title: 'Tea', value: 'tea'},
          {title: 'Flour', value: 'flour'},
          {title: 'Spices', value: 'spices'},
          {title: 'Ghee', value: 'ghee'},
          {title: 'Millets', value: 'millets'},
          {title: 'Pulses', value: 'pulses'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Used on product cards and product detail page.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      group: 'content',
      description: 'Optional label such as Bestseller or New.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'pricing',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      group: 'pricing',
      description: 'Optional MRP shown as strikethrough.',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
