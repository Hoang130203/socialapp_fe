import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { BASE_URL } from './src/api'

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		include: ['redux-thunk'],
	},
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 3000
	},
})
