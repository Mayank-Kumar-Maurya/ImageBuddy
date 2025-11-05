import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Card from './Card'
import Server from '../Context/Server.js';
import CardLoading from './CardLoading.jsx';

function Home() {

    const [search, setSearch] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const {imageList, searchImage, topSearches} = useContext(Server);
    let [load, setLoad] = useState(false);
    let [topList, setTopList] = useState([]);

    let sample = [
        "https://images.unsplash.com/photo-1560847809-8a818fb8045f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHwzfHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",

        "https://images.unsplash.com/photo-1614152412509-7a5afc18c75b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw5fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        
        "https://images.unsplash.com/photo-1622185134994-3e87da0f1bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw4fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        
        "https://images.unsplash.com/photo-1611429532458-f8bf8f6121fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw3fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        
        "https://images.unsplash.com/photo-1675233262719-6b2309a2e751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw2fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        
        "https://images.unsplash.com/photo-1694271558638-7a6f4c8879b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHwyfHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
    ]

    let callTopSearch = async()=>
        {
            let res = await topSearches();
            console.log("top:", res);
            setTopList(res);
            return;
        }

    useEffect(()=>
        {
            callTopSearch();
        }, [load, search, searchImage]);

    const handleSearch = async(e)=>
    {
        e.preventDefault();
        setLoad(true);
        if(search.length <= 0)
        {
            alert("search box is empty");
            setLoad(false);
            return;
        }
        let res = await searchImage(search);
        console.log("res:",res);
        setSearchTitle(search);
        setSearch("");
        setLoad(false);
    }

    let[selectedImage, setSelectedImage] = useState([]);

    let multiSelect = (elem)=>
    {
       
        setSelectedImage((preVal)=>
        {
            if(preVal.includes(elem))
            {
                return preVal.filter((i)=> i !== elem);
            }
            else
            {
                return [...preVal, elem];
            }
        });

    }

    return (
        <div className='row m-0 p-0' style={{height: "100vh"}}>
            <Sidebar />

            <div className='bg- p-5' style={{ width: "80%" }}>

                {/* banner */}
                <div className="alert alert-primary " role="alert">
                    Top Searches: {imageList.length >0 && topList.length >0 ? topList.map((i, index)=>(<span>{i}, </span>)) : "No Searches"}
                </div>

                {/* search */}
                <div>
                    <form className="d-flex m-2" role="search" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                   {imageList.length > 0 ? <p>Your search for {searchTitle} - {imageList.length}</p> : null}
                    <span className='bg-warning p-2 m-2 rounded'>Selected: {selectedImage.length}</span>
                </div>

                {/* cards */}
                <div className='row m-0 p-0 mt-3 justify-content-center ' style={{height: "70vh", textAlign: "justify", whiteSpace: "break-spaces", overflowY: "auto", overflowX: "hidden"}}>
                    {!load && imageList.length <= 0 && sample.map((i, index)=>
                    (
                        <Card unId={index} imageUrl={i} isSelected={selectedImage.includes(index) ? true: false} onToggle={()=>multiSelect(index)}/>
                    ))}
                    {load ? <CardLoading /> : null}
                    {!load && imageList.length >0 && imageList.map((i, index)=>
                    (
                        <Card unId={index} imageUrl={i.urls.regular} isSelected={selectedImage.includes(index) ? true: false} onToggle={()=>multiSelect(index)} />
                    ))}
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Home
