using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;

public class buttonPress : MonoBehaviour
{
    public AvatarMovingToward Avatar;
    public Animator animationController;
    void Start()
    {
        //StartCoroutine(Upload());
    }

    IEnumerator IFTTTOpenLight()
    {

        List<IMultipartFormSection> formData = new List<IMultipartFormSection>();
        UnityWebRequest www = UnityWebRequest.Post("https://maker.ifttt.com/trigger/switch1/with/key/mSl1498NtCACZrYh8eAbtz9ZgfAdFtowYUZPsDmyPhb", formData);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Form upload complete!");
        }
    }

    public void IFTTTOpenLightButton()
    {
        StartCoroutine(IFTTTOpenLight());
    }

    public void AvatarMove()
    {
        animationController.SetBool("Walking",true);
        animationController.SetBool("Idel", false);
        Avatar.move = true;
    }

    public void AvatarStop()
    {
        animationController.SetBool("Walking", false);
        animationController.SetBool("Idel", true);
        Avatar.move = false;
    }
}
