using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using M2MqttUnity.Examples;
public class objectManager : MonoBehaviour
{
    public MQTTTest mqtt;
    public GameObject plantAvatr;
    Vector3 avatarScale;
    public GameObject plantAmbientSphere;

    public Vector3 avatarOriginalScale;
    //public float avatarBig;
    //public Material plantMaterial_1;
    //public Renderer plantRender;
    // Start is called before the first frame update
    void Start()
    {
        avatarOriginalScale = plantAvatr.transform.localScale;
        //plantRender.material = plantMaterial_1;

        
    }

    // Update is called once per frame
    void Update()
    {

        //print(mqtt.PersonPresent);


        //Person Present control
        personPresent();


        //Lighting Present control
        lightPresent();
    }


    void personPresent()
    {
        if (mqtt.PersonPresent == "Human Present")
        {
            //print("person");
            avatarScale = avatarOriginalScale * 1.5f; //plant display big


        }
        else
        {
            avatarScale = avatarOriginalScale;//plant display small
        }

        plantAvatr.transform.localScale = avatarScale;
    }

    void lightPresent()
    {
        if (mqtt.LightPresent == "LightPresent")
        {
            //print("person");
            plantAmbientSphere.SetActive(true); //Ambient Sphere present
            


        }
        else
        {
            plantAmbientSphere.SetActive(false);//Ambient Sphere disable
        }
    }
}
