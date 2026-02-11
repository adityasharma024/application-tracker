import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./config";

const APPLICATIONS_COLLECTION = "applications";

// CREATE
export const addApplicationToFirestore = async (
  application,
  userId = "default-user"
) => {
  try {
    const docRef = await addDoc(
      collection(db, APPLICATIONS_COLLECTION),
      {
        ...application,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );

    return { id: docRef.id, ...application };
  } catch (error) {
    console.error("Error adding application to Firestore:", error);
    throw error;
  }
};

// READ
export const getApplicationsFromFirestore = async (
  userId = "default-user"
) => {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const applications = [];
    querySnapshot.forEach((docSnap) => {
      applications.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    return applications;
  } catch (error) {
    console.error("Error getting applications from Firestore:", error);
    throw error;
  }
};

// UPDATE
export const updateApplicationInFirestore = async (
  applicationId,
  updatedData
) => {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);

    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });

    return { id: applicationId, ...updatedData };
  } catch (error) {
    console.error("Error updating application in Firestore:", error);
    throw error;
  }
};

// DELETE (single)
export const deleteApplicationFromFirestore = async (applicationId) => {
  try {
    await deleteDoc(
      doc(db, APPLICATIONS_COLLECTION, applicationId)
    );
    return applicationId;
  } catch (error) {
    console.error("Error deleting application from Firestore:", error);
    throw error;
  }
};

// DELETE (bulk)
export const bulkDeleteApplicationsFromFirestore = async (
  applicationIds
) => {
  try {
    const deletePromises = applicationIds.map((id) =>
      deleteDoc(doc(db, APPLICATIONS_COLLECTION, id))
    );

    await Promise.all(deletePromises);
    return applicationIds;
  } catch (error) {
    console.error(
      "Error bulk deleting applications from Firestore:",
      error
    );
    throw error;
  }
};
