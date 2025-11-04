import React from 'react'

function Card(props) {

    console.log("img:",props.imageUrl)
    return (
        

            <div key={props.unId} className="card col-4 bg-dark p-0 m-3" style={{width: "18rem"}}>
                <img src={props.imageUrl.toString()} className="card-img m-0 p-0" alt="..."/>
                    {/* <div class="card-body">
                        <p class="card-text"></p>
                    </div> */}
            </div>
        
    )
}

export default Card


// sample = ["https://images.unsplash.com/photo-1629571688673-55436b6c732a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHwxMHx8Um95YWwlMjBlbmZpZWxkfGVufDB8fHx8MTc2MjA5OTA5MHww&ixlib=rb-4.1.0&q=80&w=1080",

// "https://images.unsplash.com/photo-1614152412509-7a5afc18c75b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw5fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",

// "https://images.unsplash.com/photo-1622185134994-3e87da0f1bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw4fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",

// "https://images.unsplash.com/photo-1611429532458-f8bf8f6121fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw3fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",

// "https://images.unsplash.com/photo-1675233262719-6b2309a2e751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw2fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",

// "https://images.unsplash.com/photo-1694956792421-e946fff94564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjQ5NTV8MHwxfHNlYXJjaHw1fHxSb3lhbCUyMGVuZmllbGR8ZW58MHx8fHwxNzYyMDk5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080" ]