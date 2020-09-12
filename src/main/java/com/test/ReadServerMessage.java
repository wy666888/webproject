package com.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.Socket;

public class ReadServerMessage extends Thread
{
    BufferedReader bReader;
    Socket socket;
    public ReadServerMessage(BufferedReader br)
        {
            this.bReader = br;
            start();
        }

    public void run()
        {
            String str = "";
            while (true)//一直等待着服务器的消息
                {
                    try
                        {
                        if(bReader!=null){
                            str = bReader.readLine();
                            if (str.equals("q"))
                                {
                                  bReader.close();
                                  socket.close();
                                  break;
                                }
                        }
                        }
                    catch (IOException e)
                        {
                            e.printStackTrace();
                        }
                    System.out.println("Server Message:" + str);
                }
        }
}