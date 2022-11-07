import React, { useState } from 'react';
import {View, StyleSheet,SafeAreaView, TextInput, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [meta, setMeta] = useState('')
    const [slug, setSlug] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const pickFile=()=>{
        launchImageLibrary({noData:true},(response)=>{
            if(response){
                setThumbnail(response.assets[0].fileName)
            }
        })
    }
    const handleTags=(text)=>{
      const trimmed = text.replace(/\s+/g, '')
      const array = trimmed.split(',')
      setTags( array)
    }
    const submitHandler=async()=>{
        const formData = new FormData()
        formData.append('title',title)
        formData.append('content',content)
        formData.append('meta',meta)
        formData.append('slug',slug)
        formData.append('tags',tags)
        formData.append('thumbnail',thumbnail)
        const data ={
            method:'POST',
            body:formData,
            headers:{
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
        }
        await fetch(URL, data).then(response => response.json()).then(responseData=>console.log(responseData)).catch(err=>console.log(err))
    }
    const URL = 'http://localhost:8088/api/post/create'
    const options={
        title:'select image',
        type:'library',
        options:{
            maxHeight:200,
            maxWidth:200,
            selectionLimit:1,
            mediaType:'photo',
            includeBase64:false
        }
    }
    const openGallery=async()=>{
        const images = await launchImageLibrary(options)
        
        
        const formData = new FormData()
        formData.append('title',title)
        formData.append('content',content)
        formData.append('meta',meta)
        formData.append('slug',slug)
        formData.append('tags',tags)
        formData.append('thumbnail',{
            url:images.assets[0].uri,
            // type:images.assets[0].type,
            type:'image/jpeg',
            public_id:images.assets[0].uri
        })
        await fetch(URL,
            {
                method:"POST",
                body:formData,
                headers:{
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                }
            }    
        )
        .then((response)=>response.json())
        .then(data=>console.log(data))
        .catch(err=>{console.log(err)})
        
        let responseJson = await res.json()
        console.log(responseJson)
    }
    
    return (
        <SafeAreaView style={styles.container}>
           <View>
                <TextInput
                    style={{}}
                    onChangeText={text=>setTitle(text)}
                    placeholder='Enter post title'
                    value={title}
                />
                <TextInput
                    style={{}}
                
                    onChangeText={(text)=>handleTags(text)}
                    placeholder='Enter post tags'
                    
                />
                <TextInput
                    style={{}}
                    onChangeText={text=>setContent(text)}
                    placeholder='Enter post Content'
                    value={content}
                />
                <TextInput
                    style={{}}
                    onChangeText={(text)=>setMeta(text)}
                    placeholder='Enter post meta'
                    value={meta}
                />
                <TextInput
                    style={{}}
                    onChangeText={(text)=>setSlug(text)}
                    placeholder='Enter post Slug'
                    value={slug}
                />
           </View>
           <View style={styles.image}>
            <Button style={styles.btn} title="choose file" onPress={pickFile} />
           </View>
           <View style={styles.sbmt}>
                <Button style={styles.btn} type='submit' title="Submit" onPress={submitHandler}/>
           </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        
    },
    image:{
        paddingBottom:10,
       
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn:{
       
    },
    sbmt:{
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
        
    }
})

export default CreatePost;
