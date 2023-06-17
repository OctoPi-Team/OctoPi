import { PlatformFixProps } from '../../App';
import './style/alreadyfixedinfo.css';

type Props = {
	isPlatformFixed: PlatformFixProps | undefined;
};
function AlreadyFixedInformation({ isPlatformFixed }: Props) {
	return (
		<div className={'alreadyfixedinformation'}>
			<div className={'platformnames'}> Parts {isPlatformFixed?.parts ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> Shipment {isPlatformFixed?.shipment ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> Monitoring {isPlatformFixed?.monitoring ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> Design {isPlatformFixed?.design ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> Engineering {isPlatformFixed?.engineering ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> Production {isPlatformFixed?.production ? <div>✅</div> : <div>❌</div>}</div>
		</div>
	);
}

export default AlreadyFixedInformation;
