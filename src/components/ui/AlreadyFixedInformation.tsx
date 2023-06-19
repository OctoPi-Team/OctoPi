import { PlatformFixProps } from '../../App';
import './style/alreadyfixedinfo.css';

type Props = {
	isPlatformFixed: PlatformFixProps | undefined;
};

function AlreadyFixedInformation({ isPlatformFixed }: Props) {
	return (
		<div className={'alreadyfixedinformation'}>
			<div className={'platformnamesalign'}>
				<div className={'platformnames'}> PARTS {isPlatformFixed?.parts ? <div>✅</div> : <div>❌</div>}</div>
			</div>
			<div className={'platformnames'}> DESIGN {isPlatformFixed?.design ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> SHIPMENT {isPlatformFixed?.shipment ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> MONITORING {isPlatformFixed?.monitoring ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> PRODUCTION {isPlatformFixed?.production ? <div>✅</div> : <div>❌</div>}</div>
			<div className={'platformnames'}> ENGINEERING {isPlatformFixed?.engineering ? <div>✅</div> : <div>❌</div>}</div>
		</div>
	);
}

export default AlreadyFixedInformation;
