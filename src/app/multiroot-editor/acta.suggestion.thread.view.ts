import { SuggestionThreadView } from '../../assets/ckeditor.js';

const suggestionTemplateDefinition = {

	tag: 'div',

	attributes: {
		class: [
			'ck-suggestion-wrapper',
			this.bind.if('isActive', 'ck-suggestion-wrapper--active'),
			this.bind.to('type', value => `ck-suggestion-${value}`)
		],
		'data-suggestion-id': SuggestionThreadView._model.id,
		'data-thread-id': SuggestionThreadView._model.commentThread.id,
		'data-author-id': SuggestionThreadView._model.author.id,
		// Needed for managing focus after adding a new comment.
		tabindex: -1
	},

	children: [
		{
			tag: 'div',

			attributes: {
				class: [
					'ck-suggestion',
					'ck-annotation'
				]
			},

			children: [
				SuggestionThreadView.userView,
				{
					tag: 'div',

					attributes: {
						class: ['ck-suggestion__main', 'ck-annotation__main']
					},

					children: [
						{
							tag: 'div',

							attributes: {
								class: ['ck-suggestion__info', 'ck-annotation__info']
							},

							children: [
								{
									tag: 'span',

									children: [
										{
											text: SuggestionThreadView.userView.name
										}
									],

									attributes: {
										class: ['ck-suggestion__info-name', 'ck-annotation__info-name']
									}
								},
								{
									tag: 'time',

									attributes: {
										datetime: SuggestionThreadView.bind.to('createdAt'),
										class: ['ck-comment__info-time', 'ck-annotation__info-time']
									},

									children: [
										{
											text: SuggestionThreadView.bind.to('createdAt', value => SuggestionThreadView._config.formatDateTime(value))
										}
									]
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'ck-suggestion__actions',
									'ck-annotation__actions'
								]
							},

							children: [
								SuggestionThreadView.acceptButton,
								SuggestionThreadView.discardButton
							]
						},
						{
							tag: 'div',

							attributes: {
								class: ['ck-annotation__content-wrapper']
							},
							children: [
								{
									text: SuggestionThreadView.bind.to('descriptionParts', value => {
										console.log('#### SuggestionThreadView CONTENT:', value);
										//SuggestionThreadView._config.formatDateTime( value ); 

									}
									)
								}
							]
						}
					]
				}
			]
		},
		SuggestionThreadView.commentsListView,
		SuggestionThreadView.commentThreadInputView
	]
};

export default suggestionTemplateDefinition;