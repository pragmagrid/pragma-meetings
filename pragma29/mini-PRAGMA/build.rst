
.. highlight:: rest

Build Lifemapper Biodiversity Infrastructure in VirtualBox
============================================================
This section list steps needed to setup VirtualBox images.

`Back`_

.. contents::

Start VirtualBox
--------------------

Start VirtualBox (as you normally would start an application on your laptop)

#. Verify Extensions are installed.

   Open `VirtualBox -> Preferences` and click on `Extensions` tab.
   You should see a popup window like this: 

   .. image:: images/pref-extensions.png

#. Setup NAT and Host-only networks 

   Open `VirtualBox -> Preferences` and click on `Network` tab.
   Setup 2 networks per information below: 

   .. image:: images/pref-network-nat.png
   .. image:: images/pref-network-host.png

Create shared folders on your laptop
------------------------------------

Import 2 virtual images into Virtual Box
--------------------------------------------

Start Virtual Images
----------------------

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


`Back`_ 

.. _Back : README.rst

