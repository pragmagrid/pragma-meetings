
.. highlight:: rest

International Workshop on Building Collaboration in Biodiversity Informatics
=============================================================================

.. contents::

Introduction
--------------

This page is for participants who will be attending Lifemapper-related part of the tutorial.

Prerequisites
---------------
This section lists the required steps that need to be done prior to the workshop:

+ Download and install ``Virtual Box``
+ Download ``Lifemapper cluster images`` for Virtual Box
+ Download tutorial sample data 

Please follow the instructions in `Prerequisites`_ section to complete the
installation of the requitred software and images. 

.. _Prerequisites : prerequisites.rst


Build Lifemapper Biodiversity Infrastructure in Virtual Box.
------------------------------------------------------------
This section list steps we will do as a setup during the workshop.

#. Start VirtualBox (as you normally would start an application on your laptop)

   #. Verify Extensions are installed.

      Open `VirtualBox -> Preferences` and click on `Extensions` tab.
      You should see a popup window like this: 

      .. image:: images/pref-extensions.png
         :scale: 10 %

#. Import 2 virtual images into Virtual Box

#. Setup NAT network

#. Create shared folders on your laptop

#. Run frontend 
   Start an image `lm620` from Virtual Box GUI or via a command line ::

       % vboxmanager startvm lm620

#. Run compute node
   Start an image `lm620-compute` form Virtual Box GUI or via a command line::

       % vboxmanager startvm lm620-compute
   
#. Login on a frontend

   User: root
   Password: ****

   #. Verify that you can reach compute node via a command: ::

           # ssh compute-0-0 
           # exit 

   #. Verify that shared directories are visible: :: 
      
           # ls /media

      There should be `sf_data1` listed under /media for a directory
      that was specified in `Shared Folders` settings with name `data1`.

      Please note the path of shared directory must work the same on a compute node.

   #. Verify that you are connecte4d to a network: ::

           # ping 8.8.8.8
