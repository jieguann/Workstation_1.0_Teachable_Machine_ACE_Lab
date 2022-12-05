using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AvatarMovingToward : MonoBehaviour
{
    public bool move;

    public Transform PlantAvatar;
    public Transform LightTarget;
    public float speed = 1.0f;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if(move == true)
        {
            PlantAvatarMove();
        }
    }

    public void PlantAvatarMove(){
        float step = speed * Time.deltaTime; // calculate distance to move
        PlantAvatar.transform.position = Vector3.MoveTowards(PlantAvatar.transform.position, LightTarget.position, step);
        PlantAvatar.transform.LookAt(LightTarget);
    }
}
