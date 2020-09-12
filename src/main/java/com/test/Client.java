package com.test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class Client
    {

        /**
         * Author: 至尊龙
         * 客户端
         */
        public static void main(String[] args)
            {
                Socket socket = null;
                BufferedReader br = null;
                PrintWriter pw = null;
                Scanner scanner = new Scanner(System.in);// 从键盘读取
                try
                    {
                        // 创建客户端socket
                        socket = new Socket("192.168.1.114", 90);
                        // 读取从客户端发来的消息
                        br = new BufferedReader(new InputStreamReader(
                                socket.getInputStream()));
                        // 写入信息到服务器端
                        pw = new PrintWriter(
                                new BufferedWriter(new OutputStreamWriter(
                                        socket.getOutputStream())));
                        new ReadServerMessage(br);// 从服务器读取消息
                        while (true)
                            {
                                String temp = scanner.nextLine();// 从键盘读取一行
                                pw.println(temp);// 写到服务器
                                pw.flush();
                                if (temp.equals("q"))
                                    break;
                            }
                    }
                catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                finally
                    {
                        try
                            {
                                System.out.println("关闭......");
                                br.close();
                                pw.close();
                                socket.close();
                            }
                        catch (IOException e)
                            {
                                e.printStackTrace();
                            }
                    }

            }

    }