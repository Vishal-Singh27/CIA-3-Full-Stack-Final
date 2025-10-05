import React, { use } from 'react'
import { get, useForm } from "react-hook-form"
import { AuthContext } from './Context'
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router'
import axios from 'axios'

export const Add_post = () => {
    const { register, handleSubmit, state, formState: {errors}, getValues } = useForm();
    const navigate = useNavigate();
    const {user} = React.useContext(AuthContext);
    return (
        <> 
            <div className='min-h-screen min-w-screen flex justify-center'>
                <form onSubmit={handleSubmit(async () => {
                    try {
                        let user_id = await axios.post("http://localhost:5002/user/find_id", {"username": user});
                        let title = getValues("title");
                        let desc = getValues("desc");
                        let rating = getValues("rating");
                        let picture = getValues("picture")
                        let location = {
                            name: getValues("p_name"),
                            long: getValues("long"),
                            lat: getValues("lat"),
                        }
                        await axios.post("http://localhost:5002/post/add", {
                            "user": user_id.data.id,
                            "title": title,
                            "description": desc,
                            "picture": picture,
                            "rating": rating,
                            "location": location
                        })
                        toast.success("Post Added");
                    } catch (e) {
                        toast.error("Post couldnt be added: " + e);
                    }
                    
                })}>
                    <label className='flex justify-center text-3xl'>Add Post</label><br />
                    <label>Posted by: </label>
                    <input name='name' type='text' value={!user? "" : user} disabled={true} className='input'/>
                    <br/>
                    <label>Title: </label>
                    <br/>
                    <input name='name' type='text' className='input' {...register("title")}/>
                    <br />
                    <label>Description: </label>
                    <br/>
                    <textarea className='textarea' {...register("desc")}/>
                    <br />
                    <label>Picture address: </label>
                    <br/>
                    <input name='name' type='text' className='input' {...register("picture")}/>
                    <br />
                    <label>Rating: </label>
                    <br/>
                    <select className='select' id="rating" {...register("rating")}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <br />
                    <label>Place name: </label>
                    <br/>
                    <input name='name' type='text' className='input' {...register("p_name")}/>
                    <label>Latitude: </label>
                    <br/>
                    <input name='name' type='text' className='input' {...register("lat")}/>
                    <label>Logitude: </label>
                    <br/>
                    <input name='name' type='text' className='input' {...register("long")}/>
                    
                    
                    <div className='flex justify-center'><input type='submit' value={"Post"} className='border-2 mt-5 w-16' /></div>
                </form>
            </div>
        </>
    )
}
