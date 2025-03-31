import React,{ useState } from "react";
import {Text, View, Alert, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {MaterialIcons, FontAwesome6, AntDesign} from '@expo/vector-icons';
import { themas } from "@/global/themes";
import { router } from "expo-router";

import { useMutation, useQuery } from "@apollo/client";
import { getProducts, createProduct , deleteProduct, updateProduct} from "./graphql/product.js"


export default function ProductScreen (){

    const {data, loading, error, refetch} = useQuery(getProducts);

    const [createProductMutation] = useMutation(createProduct,{
        onCompleted: () => refetch(),
    })
    const [deleteProductMutation] = useMutation(deleteProduct,{
        onCompleted: () => refetch(),
    })
    const [updateProductMutation] = useMutation(updateProduct,{
        onCompleted: () => refetch(),
    })

    const [name, setName] = useState({ value: '', dirty: false });
    const [image, setImage] = useState({ value: '', dirty: false });
    const [price, setPrice] = useState({ value: '', dirty: false });
    const [storage, setStorage] = useState({ value: '', dirty: false });
    const nameRegex = /^.{2,}$/;

    const sendForm = async () =>{
        const result = await createProductMutation({
            variables: {
                name: name.value,
                image: image.value,
                price: parseFloat(price.value), // Convertendo para número
                storage: parseInt(storage.value) // Convertendo para inteiro
            }
        });        
        console.log(result)
        Alert.alert('Sucesso', 'Produto registrado com sucesso!');
        router.replace('/(tabs)');
    }
    

    const handleErrorName = () => {
        if (!name.value && name.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else if (!nameRegex.test(name.value) && name.dirty) {
            return <Text style={style.error}>Nome deve ter no mínimo 2 caracteres</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    const handleErrorURL = () => {
        if (!image.value && image.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    const handleErrorPRICE = () => {
        if (!price.value && price.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    const handleErrorSTORAGE = () => {
        if (!storage.value && storage.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    
    
    const handleErrorForm = () => {
        let hasError = false;
    
        if (!name.value) {
            setName({ value: name.value, dirty: true });
            hasError = true;
        }
        if (!image.value) {
            setImage({ value: name.value, dirty: true });
            hasError = true;
        }
        if (!price.value) {
            setPrice({ value: name.value, dirty: true });
            hasError = true;
        }
        if (!storage.value) {
            setStorage({ value: name.value, dirty: true });
            hasError = true;
        }
    
        if (!nameRegex.test(name.value)) {
            setName({ value: name.value, dirty: true });
            hasError = true;
        }
    
        if (!hasError) {
            sendForm()
        }
    };
    


    return(
        <>    
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
        <ScrollView contentContainerStyle={style.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={style.container}>
            <View style={style.boxTop}>
                <AntDesign name="CodeSandbox" style={style.logo}></AntDesign>
                <Text style={style.text}>E-Commerce IA</Text>
                <Text style={style.subtitle}>Cadastre Seu Produto Aqui!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>NOME PRODUTO</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='Nome' onChangeText={(text) => {setName({value: text, dirty: true})}}/>
                <FontAwesome6
                    style={{marginHorizontal:-10}}
                    name="user-large"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>
                {handleErrorName()}



                <Text style={style.titleInput}>ENDEREÇO DA IMAGEM</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='URL Imagem' onChangeText={(text) => {setImage({value: text, dirty: true})}}/>
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="link"
                    size={20}
                    color={themas.Colors.gray}
                    />

                </View>
                {handleErrorURL()}

                




                <Text style={style.titleInput}>PREÇO DO PRODUTO</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='Preço' onChangeText={(text) => {setPrice({value: text, dirty: true})}}/>
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="price-check"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>
                {handleErrorPRICE()}

                <Text style={style.titleInput}>ESTOQUE</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='Estoque' onChangeText={(text) => {setStorage({value: text, dirty: true})}}/>
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="move-to-inbox"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>
                {handleErrorSTORAGE()}
            </View>
              
            <View style={style.boxBottom}>
            <TouchableOpacity style={style.button} onPress={()=> handleErrorForm()}
                ><Text style={style.textBottom}>CRIAR PRODUTO</Text></TouchableOpacity> 
             
            </View>
            <Text style={style.textBottomDown}></Text>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    )

}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    error:{
        width: '100%',
        marginLeft:20,
        marginBottom: 0,
        color: 'red',
        fontWeight: 'bold',
        height: 20,
        fontSize: 14
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 2,
    },
    boxMid:{
        flex:1, // Permite que os inputs ocupem o espaço necessário
        width:'100%',
        paddingHorizontal:37,
        justifyContent: 'center' // Centraliza os inputs verticalmente no espaço disponível
    },
    boxBottom:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: 10 // Garante um espaçamento entre os inputs e o botão
    },
    boxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:40,
        borderColor:themas.Colors.lightGray,
        backgroundColor:themas.Colors.bgScreen,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
    },
    logo:{
        fontSize:Dimensions.get('window').height/6,
        color:"#black",
        marginTop:40,
    },
    text:{
        marginTop:20,
        fontSize:26,
        fontWeight:'bold',
        marginBottom:10
    },
    input:{
        height:'100%',
        width:'100%',
        borderRadius:40,
    },
    subtitle:{
        marginLeft:5,
        fontSize:20,
        color:themas.Colors.gray,
    },
    button:{
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.Colors.primary,
        borderRadius:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    boxIcon:{
        width:50,
        height:50,
        backgroundColor:'red'
    },
    titleInput:{
        marginLeft:5,
        color:themas.Colors.gray,
        marginTop:5
    },
    textBottom:{
        fontSize:16,
        color:'#FFFF',
        fontWeight:'bold'
    },
    textBottomDown:{
        paddingTop:20,
        fontSize:16,
        color:themas.Colors.gray,
        fontWeight:'bold'
    },
    textBottomCreate:{
        fontSize:16,
        color:themas.Colors.primary
    }
})