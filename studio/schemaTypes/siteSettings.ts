import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Verbiance Group',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'announcementText',
      title: 'Announcement Text',
      type: 'string',
      description: 'Top bar text shown across the storefront.',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook URL', type: 'url'}),
        defineField({name: 'youtube', title: 'YouTube URL', type: 'url'}),
      ],
    }),
  ],
})
