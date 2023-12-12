import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
	context.res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	)
	const subSite = context.params?.subSite
	try {
        const brandName = subSite
        const file = await fetch(`https://nowhiring.com/api/career-live-sites/nowhiring.com%2F${brandName}`).then(res => res.text())
        // console.log(file)
        const jsonObject: SiteInterface = JSON.parse(file) as SiteInterface
		const o_externalRef = jsonObject.owner.Id	
		
        return {
            props: { jobDetail: null},
        }
    } catch (error) {
        return {
            props: { jobDetail: null},
        }
    }
	// const id = context.params?.jobId
	// const urlParams = (id as string).split('-')
	// const jobId = urlParams.length > 0 ?  urlParams.findLast(x => Number.parseInt(x) > 0) : undefined
	// if(jobId) {
		
	// 	// try {
    //     //     // TODO : update organization_id by subsite for nowhiring
    //     //     if(process.env.NEXT_PUBLIC_DOMAIN === 'nowhiring.com') {
    //     //         // Load 
    //     //     }
	// 	// 	const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/oid/${process.env.NEXT_PUBLIC_ORGANISATION_ID}/jobDetail/${jobId}`)
	// 	// 	const json = await result.json()
	// 	// 	const jobDetail: JobDetailType = json['data']
	// 	// 	return {
	// 	// 		props: { jobDetail },
	// 	// 	}
	// 	// } catch (error) {
	// 	// 	return {
	// 	// 		props: { jobDetail: null}
	// 	// 	}
	// 	// }
	// }
	return {
		props: { jobDetail: null}
	}

}

export interface Props {
	jobDetail: JobDetailType | null;
}
const JobDetailPage = () => {
    return <div>
        Hello
    
    </div>
}

export default JobDetailPage