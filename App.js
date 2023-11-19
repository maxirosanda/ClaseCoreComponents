/*
FlexBox
SafeAreaView
Touchables
StatusBar
validacion
estilos generales
*/
import { useState } from "react"
import {  View,
          StyleSheet, 
          TextInput, 
          Button,
          Text, 
          FlatList,
          Modal,
          TouchableWithoutFeedback,
          Keyboard, 
          SafeAreaView,
        } from "react-native"
import { v4 as uuidv4 } from 'uuid'

const App = () => {

  const [list , setList] = useState([])
  const [newTitleProduct,setNewTitleProduct] = useState("")
  const [productSelected,setProductSelected] = useState({})
  const [modalVisible,setModalVisible] = useState(false)

  const handlerAddProduct = () => {
   
    const uniqueId = uuidv4()

    const newProduct = {
      id: uniqueId,
      title:newTitleProduct
    }
    setList(currentProducts => [...currentProducts,newProduct])
    setNewTitleProduct("")
    Keyboard.dismiss()
  }
  const handlerNewTitleProduct = (t) => {
    setNewTitleProduct(t)
  }

  const handlerDeleteProduct = () => {
    setList(currentList => currentList.filter(item => item.id != productSelected.id))
    setModalVisible(false)
  }

  const handlerModal = (item) => {

    setProductSelected(item)
    setModalVisible(true)
  }

  return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}> 
              <TextInput
                placeholder="Product"
                style={styles.input} 
                value={newTitleProduct} 
                onChangeText={handlerNewTitleProduct}
              />
              <Button title="ADD" onPress={handlerAddProduct} />
            </View>
            <View style={styles.listContainer}>
                 <FlatList
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item})=>{
                      return  <View>
                                <View style={styles.itemList}>
                                  <Text>{item.title}</Text>
                                  <Button title="Del" onPress={() => handlerModal(item)} />
                                </View> 
                              </View>
                    }}
                 />
            </View>
            <Modal
             
              animationType="slide"
              visible={modalVisible}
            >
              <View style={styles.modalTitle}>
                <Text>Mi modal</Text>
              </View>
              <View style={styles.modalMessage}>
                <Text>¿estas seguro que desea borrar?</Text>
              </View>
              <View style={styles.modalItem}>
                <Text>{productSelected.title}</Text>
              </View>
              <View style={styles.modalButton}>
                <Button  title="Aceptar" onPress={handlerDeleteProduct}/>
                <Button title="Cancelar" onPress={()=>setModalVisible(false)}/>
              </View>
              </Modal>
          </SafeAreaView>
        </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    flex:1,
    padding:30,
    margin:15
  },
  inputContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"end"
  },
  input:{
    borderBottomWidth:2,
    paddingVertical:5,
    width:200
  },
  listContainer:{
    padding:10
  },
  itemList: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10
  },
  modalTitle:{
    backgroundColor:"#ccc",
    color:"white",
    fontSize:18
  },
  modalMessage:{
    marginVertical:10,
    justifyContent:"center",
    alignItems:"center"
  },
  modalButton:{
    marginTop:15
  },
  modalItem:{
    fontSize:30
  }

})

export default App

