import './app.css'
import App from './pages/index.astro'

const app = new App({
  target: document.getElementById('app'),
})

export default app
