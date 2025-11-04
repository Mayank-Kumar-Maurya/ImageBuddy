const isAuthenticated = (req, res, next)=>
{
    let currUser = res.locals.currentUser;
    if(currUser)
    {
        next();
    }
    else
    {
        res.status(401).json({message: "Loggin First"});
    }
}