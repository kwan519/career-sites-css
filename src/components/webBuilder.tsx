import GjsEditor from '@grapesjs/react'
import type { Editor } from 'grapesjs'
import plugin from 'grapesjs-preset-webpage'
import pluginNavBar from 'grapesjs-navbar'


interface MyPluginOptions {
    opt1: string,
    opt2?: number,
}
  
const DefaultEditor = () => {
	const onEditor = (editor: Editor) => {
		console.log('Editor loaded', { editor })
	}
	return <GjsEditor
		grapesjs="https://unpkg.com/grapesjs"
		grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
		options={{
			container: '#gjs',
			height: '100vh',
			width: '100%',
			plugins: 
			[
				editor => plugin(editor, {
					blocks: ['link-block', 'quote', 'text-basic'],
				}),
				editor => pluginNavBar(editor, {
				})
			],
			storageManager: {
				id: 'gjs-',
				type: 'local',
				autosave: true
			},
			deviceManager: {
				devices:
					[
						{
							id: 'desktop',
							name: 'Desktop',
							width: '',
						},
						{
							id: 'tablet',
							name: 'Tablet',
							width: '768px',
							widthMedia: '992px',
						},
						{
							id: 'mobilePortrait',
							name: 'Mobile portrait',
							width: '320px',
							widthMedia: '575px',
						},
					]
			}
		}}
		onEditor={onEditor}
	/>
}

export default DefaultEditor