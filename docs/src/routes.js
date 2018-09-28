import QuickStart from './pages/QuickStart.md'
import ComponentA from './pages/ComponentA.md'
import ComponentB from './pages/ComponentB.md'
import TypeAhead from './pages/TypeAhead.md'
import CountrySuggest from './pages/CountrySuggest.md'

export default [
  { path: '/quick-start', component: QuickStart },
  { path: '/component-a', component: ComponentA },
  { path: '/component-b', component: ComponentB },
  { path: '/typeahead', component: TypeAhead },
  { path: '/countrysuggest', component: CountrySuggest },
  { path: '*', redirect: '/quick-start' }
]
