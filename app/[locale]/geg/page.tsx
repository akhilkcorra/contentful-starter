'use client'
import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Logo } from '@/public/icons'
import Heading from '@/ui/components/core-ui/Heading'
import Button from '@/ui/components/core-ui/Button'
import CustomLink from '@/ui/components/core-ui/CustomLink'
import Input from '@/ui/components/core-ui/Input'
import Select from '@/ui/components/core-ui/Select'
import RadioButtonGroup from '@/ui/components/core-ui/RadioButtonGroup'
import Checkbox from '@/ui/components/core-ui/Checkbox'
import Pagination from '@/ui/components/core-ui/Pagination'
import Breadcrumbs from '@/ui/components/core-ui/Breadcrumbs'
import Alert from '@/ui/components/core-ui/Alert'
import Collapsible from '@/ui/components/core-ui/Collapsible'

const GEG = () => {
    // Breadcrumb
    const breadcrumbArray = [
        { title: 'Home', link: '/' },
        { title: 'Products', link: '/products' },
        { title: 'Shoes', link: '/products/shoes' }
    ]
    // Select
    const options = [
        {
            label: 'Select a color',
            value: ''
        },
        {
            label: 'Red',
            value: 'red'
        },
        {
            label: 'Green',
            value: 'green'
        },
        {
            label: 'Blue',
            value: 'blue'
        }
    ]
    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages = 10 // Assume there are 10 pages in total
    const paginationArray = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    // Alert
    const [isAlertVisible, setAlertVisible] = useState(true)
    const closeAlert = () => {
        setAlertVisible(false)
    }
    return (
        <div className="global-element-guide container mx-auto px-5">
            <section className="mt-5 pb-8 border-b border-solid border-black">
                <h2 className="mb-5 text-2xl font-bold">Logo</h2>
                <Link href="/Home" title="Logo" className="inline-block">
                    <Logo />
                </Link>
            </section>
            <section className="mt-5 pb-8 border-b border-solid border-black">
                <h2 className="mb-5 text-2xl font-bold">Typography</h2>
                <div className="flex items-center flex-wrap gap-x-20 gap-y-10 mb-12">
                    <div className="gap-4">
                        <div className="text-[2rem] font-bold leading-normal rounded-lg">
                            Aa
                        </div>
                        <div>
                            <div className="text-base text-gray">Font name</div>
                            <div>Font varient</div>
                        </div>
                    </div>
                    <div className="gap-4">
                        <div className="text-[2rem] font-bold leading-normal rounded-lg">
                            Aa
                        </div>
                        <div>
                            <div className="text-base text-gray">Font name</div>
                            <div className="text-base text-gray">
                                Font varient
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-7">
                    <h2 className="mb-5 text-2xl font-bold btn">Heading</h2>
                    <Heading
                        className="custom-class"
                        style={{ padding: '5px' }}
                    >
                        Heading 1
                    </Heading>
                    <Heading as="h2">Heading 2</Heading>
                    <Heading as="h3">Heading 3</Heading>
                    <Heading as="h4">Heading 4</Heading>
                    <Heading as="h5">Heading 5</Heading>
                    <Heading as="h6">Heading 6</Heading>
                </div>
                <div>
                    <h2 className="mb-5 text-2xl font-bold">Body Font</h2>
                    <p className="font-normal text-base leading-normal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Enim labore asperiores quos iusto porro, repellendus
                        impedit veritatis provident. Culpa, fugit optio quis
                        ipsa exercitationem
                    </p>
                </div>
            </section>
            <section className="mt-5 pb-8">
                <h2 className="mb-6 text-2xl font-bold">Components</h2>
                <div className="flex items-center flex-wrap gap-x-20 gap-y-14 mb-10">
                    <div>
                        <h2 className="mb-5 text-base font-bold">
                            Primary Button
                        </h2>
                        <Button
                            as="button"
                            variant="primary"
                            aria-label="Add to Cart"
                        >
                            Add to Cart
                        </Button>
                        <br />
                        <br />
                        <Button
                            as="button"
                            variant="disabled"
                            disabled
                            aria-label="Add to Cart"
                            aria-disabled="true"
                        >
                            Add to Cart
                        </Button>
                        <br />
                        <br />
                        <Button as="button" variant="primary" smaller>
                            Small button
                        </Button>
                    </div>
                    <div>
                        <h2 className="mb-5 text-base font-bold">
                            Secondary Button
                        </h2>
                        <Button
                            as="button"
                            variant="secondary"
                            aria-label="Add to Cart"
                        >
                            Add to Cart
                        </Button>
                        <br />
                        <br />
                        <Button
                            as="button"
                            variant="disabled"
                            disabled
                            aria-label="Add to Cart"
                            aria-disabled="true"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">Inverse Button</h2>
                    <div className="bg-[#9C9C9C] p-10 inline-block">
                        <Button
                            as="button"
                            variant="inverse"
                            aria-label="Add to Cart"
                        >
                            Add to Cart
                        </Button>
                        <br />
                        <br />
                        <Button
                            as="button"
                            variant="inverseDisabled"
                            disabled
                            aria-label="Add to Cart"
                            aria-disabled="true"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-20 gap-y-14 mb-10">
                    <div>
                        <h2 className="mb-5 text-base font-bold">
                            Primary Text Link
                        </h2>
                        <CustomLink to="/" target="_blank">
                            Learn More
                        </CustomLink>
                        <br />
                        <CustomLink to="/" disabled>
                            Learn More
                        </CustomLink>
                    </div>
                    <div>
                        <h2 className="mb-5 text-base font-bold">
                            Secondary Text Link
                        </h2>
                        <CustomLink to="/" variant="linkSecondary">
                            Learn More
                        </CustomLink>
                        <br />
                        <CustomLink to="/" disabled>
                            Learn More
                        </CustomLink>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">Input Fields</h2>
                    <Input
                        id={'CustomerEmail'}
                        label="Email"
                        placeholder="Enter your Email Id"
                    />
                    <Input
                        id={'CustomerEmail1'}
                        label="Email"
                        placeholder="Enter your Email Id"
                        error="This field is required."
                    />
                    <Input
                        id={'CustomerPassword'}
                        label="Password"
                        placeholder="Enter your Password"
                        type={'password'}
                    />
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">Dropdown</h2>
                    <form>
                        <Select
                            options={options}
                            name="color"
                            size="large"
                            label="Choose a color"
                        ></Select>
                    </form>
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">Selectors</h2>
                    <div className="flex flex-wrap gap-x-20 gap-y-14 mb-10">
                        <div className="flex flex-col">
                            <RadioButtonGroup />
                        </div>
                        <div className="flex flex-col">
                            <Checkbox id="checkbox" legend="Checkbox">
                                Checkbox
                            </Checkbox>
                            <Checkbox
                                id="checkbox1"
                                legend="Checkbox"
                                checked={true}
                            >
                                Checkbox
                            </Checkbox>
                            <Checkbox
                                id="checkbox2"
                                legend="Checkbox"
                                disabled={true}
                            >
                                Checkbox (Disabled)
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="mb-3 text-base font-bold">Pagination</h2>
                    <Pagination
                        paginationArray={paginationArray}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                <div className="mb-10">
                    <h2 className="mb-3 text-base font-bold">Breadcrumbs</h2>
                    <Breadcrumbs breadcrumbArray={breadcrumbArray} />
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">List Style</h2>
                    <div className="mb-5">
                        <h2 className="mb-3 text-base font-bold">
                            Un-ordered List(ul)
                        </h2>
                        <ul className="list-disc pl-7">
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h2 className="mb-3 text-base font-bold">
                            Ordered List(ol)
                        </h2>
                        <ol className="list-decimal pl-7">
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="mb-5 text-base font-bold">
                        Alert Messaging
                    </h2>
                    <div>
                        {isAlertVisible && (
                            <Alert
                                message="Success message"
                                type="success"
                                onClose={closeAlert}
                            ></Alert>
                        )}
                    </div>
                    <div>
                        {isAlertVisible && (
                            <Alert
                                message="Warning message"
                                type="warning"
                                onClose={closeAlert}
                            ></Alert>
                        )}
                    </div>
                    <div>
                        {isAlertVisible && (
                            <Alert
                                message="Error message"
                                type="error"
                                onClose={closeAlert}
                            ></Alert>
                        )}
                    </div>
                    <div>
                        {isAlertVisible && (
                            <Alert
                                message="Information message"
                                type="info"
                                onClose={closeAlert}
                            ></Alert>
                        )}
                    </div>
                    <div>
                        {isAlertVisible && (
                            <Alert
                                message="Notification message"
                                type="notification"
                                onClose={closeAlert}
                            ></Alert>
                        )}
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="mb-3 text-base font-bold">
                        Collapsible Container
                    </h2>
                    <Collapsible title="Collapsible Container">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ullam totam blanditiis impedit quas sint, ex
                            ad ducimus..
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ullam totam blanditiis impedit quas sint, ex
                            ad ducimus.
                        </p>
                    </Collapsible>
                </div>
            </section>
        </div>
    )
}

export default GEG
