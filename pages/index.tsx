import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import { motion } from 'framer-motion'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="bg-black">
      <div
        className="mx-auto max-w-7xl flex-col flex min-h-screen
    py-20 px-10 2xl:px-0"
      >
        <Head>
          <title>NFT Drop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1
          className="w-52 cursor-pointer text-xl font-extralight
          sm:w-80 "
        >
          NFT Marketplace
        </h1>

        <main>
          <motion.div
            className="bg-gradient-to-br from-yellow-400 to-purple-600 
        rounded-tl-full rounded-br-full p-10 shadow-xl shadow-purple-400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <div className="bg-inherit">
              {collections.map(collection => (
                <div className="flex flex-col items-center">
                  <Link href={`/nft/${collection.slug.current}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        default: {
                          duration: 1,
                          ease: [0, 0.71, 0.2, 1.01]
                        },
                        scale: {
                          type: 'spring',
                          damping: 5,
                          stiffness: 100,
                          restDelta: 0.001
                        }
                      }}
                    >
                      <div
                        className="transition-all duration-200 hover:scale-125
                  cursor-pointer "
                      >
                        <img
                          className=" h-96 w-60 rounded-2xl object-cover"
                          src={urlFor(collection.mainImage).url()}
                          alt=""
                        />
                        <div>
                          <h2 className="text-3xl text-rose-300 drop-shadow-lg shadow-black">
                            {collection.title}
                          </h2>
                          <p className=" text-gray-100 text-ellipsis">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"] {
    _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage {
      asset
      },
    previewImage {
      asset
    },
    slug  {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections
    }
  }
}
