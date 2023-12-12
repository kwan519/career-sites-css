import JobDetailPageBuilder from "@/components/template/jobDetail"
import { ThemeContext } from "@/contexts/themeContext"
import { GetServerSideProps } from "next"
import Head from "next/head"


export const getServerSideProps: GetServerSideProps = async (context) => {
	// context.res.setHeader(
	// 	'Cache-Control',
	// 	'public, s-maxage=10, stale-while-revalidate=59'
	// )
	const subSite = context.params?.subSite
	const jobId = context.params?.jobId
	console.log('subSite', subSite)
	try {
		const brandName = subSite
		const file = await fetch(`https://nowhiring.com/api/career-live-sites/nowhiring.com%2F${brandName}`).then(res => res.text())
        // console.log(file)
        const jsonObject: SiteInterface = JSON.parse(file) as SiteInterface
		console.log(`${jsonObject.owner.id}`)
		if (jobId) {
			const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/oid/${jsonObject.owner.id}/jobDetail/${jobId}`)
			if (result.status == 200) {
				const json = await result.json()
				console.log(json)
				const jobDetail: JobDetailType = json['data']
				return {
					props: {
						jobDetail: jobDetail,
						site: jsonObject
					},
				}
			}
			return {
				props: { jobDetail: null, site: jsonObject },
			}

		} else {
			return {
				props: { jobDetail: null, site: jsonObject },
			}
		}

	} catch (error) {
		console.error(error)
		return {
			props: { jobDetail: null, site: null },
		}
	}

}

export interface Props {
	jobDetail: JobDetailType | null;
	site: SiteInterface
}
const JobDetailPage = ({ site, jobDetail }: Props) => {
	if (site) {
		return <ThemeContext.Provider value={{ theme: site.theme }}>
			<Head>
				<link rel="stylesheet" href={`/cs${site.domain.replace('nowhiring.com', '')}/style.css`} />
			</Head>
			{jobDetail ?
				<JobDetailPageBuilder site={site} jobDetail={jobDetail} /> : <div>Job not found </div>}
		</ThemeContext.Provider>
	}

	return <div>No config file</div>
}

export default JobDetailPage