import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/tables/DataTable";
import { AccordionData } from "../../interfaces/AccordionInterfaces";
import { AuthorTableHeader, BookTableHeader } from "../tables/TableDatas";
import { fetchAllBooks } from "../../apis/bookApi";
import LibraryAccordion from "../../components/accordions/LibraryAccordion";
import { BookForm } from "../forms/CreateAndUpdateForms";

/**
 * Accordion Datas for Book Page
 */
export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={[]} setTrigger = {() => console.log("trigger")}/>) },
    { title: "Add Book", info: "Add a new Book", data: (<BookForm format={"create"} setTrigger = {() => console.log("Trigger")} />) }
]

/**
 * Accordion for Book Page
 * @returns Rendered Accordion designed for Books 
 */
export default function BookAccordions() {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [books, setBooks] = React.useState<any>([]);
    const [trigger,setTrigger] = React.useState<boolean>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //UseCallBack 
    const fetchData = useCallback(async () => {
        const res = await fetchAllBooks();
        setBooks(res);
    }, [trigger]); // A Context can be better maybe


    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    BookAccordionDatas[0].data = (<DataTable headers={BookTableHeader} tableDatas={books} setTrigger={() => setTrigger(!trigger)}/>);
    BookAccordionDatas[1].data = (<BookForm format={"create"} setTrigger={() => setTrigger(!trigger)}/>)


    //Render
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={BookAccordionDatas} />
    )
}


export const AuthorAccordionDatas:AccordionData[] = [
    { title: "View Authors", info: "View the Authors in Table Format", data: (<DataTable headers={AuthorTableHeader} tableDatas={[]} setTrigger = {() => console.log("trigger")}/>) },
]

export const AuthorAccordions = () => {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [authors, setAuthors] = React.useState<any>([]);
    const [trigger,setTrigger] = React.useState<boolean>(false);
    //Handlers
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return(
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={AuthorAccordionDatas} />
    )
}