/* import 'normalize.css'; */
import ContextWrapper from './ContextWrapper';
import PresenceProvider from './RoutingAnimation/PresenceProvider';
import AnimatedRoutes from './RoutingAnimation/AnimatedRoutes';

export default function App() {
	return (
		<ContextWrapper>
			<PresenceProvider>
				<AnimatedRoutes />
			</PresenceProvider>
		</ContextWrapper>
	)
}