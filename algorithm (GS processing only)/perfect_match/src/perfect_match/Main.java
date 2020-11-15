package perfect_match;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main{

	//Number of people that fill out the survey
	int numPeople = 0;

	static int gender = 0;
	static int age = 2;
	static int height = 4;
	static int ageH = 3;
	static int ageL = 3;

	//The data of all men, after being read from the CSV, is stored in here
	static String[][] menData = null;

	//The data of all women, after being read from the CSV, is stored in here
	static String[][] womenData = null;

	//Free men in GS pairings
	static LinkedList<Integer> freeMen;

	static HashMap<Integer, int[]> forbiddenPairs = new HashMap<Integer, int[]>();

	/* 
	 * Name of file where data is being stored.
	 */
	String userData = "answer.csv";

	public static void main(String[] args) {
		new Main().read();
		//new Main().crushMatch(menData, womenData);
		int[][] men = new Main().generateRankings(menData, womenData);
		int[][] women = new Main().generateRankings(menData, womenData);
		freeMen = new LinkedList<Integer>();
		for(int i = 0; i < men.length; i++) {
			freeMen.add(i);
		}
		generateFP(menData, womenData);
		System.out.println(forbiddenPairs.size());
		String s = new Main().gs(men, women, freeMen, forbiddenPairs);
		System.out.println(s);
	}

	static void generateFP(String[][] mD, String[][] wD) {
		for(int i = 0; i < mD.length; i++) {
			String ages = mD[i][ageH];
			Pattern p = Pattern.compile("\\d+");
			Matcher m = p.matcher(ages);
			int high = 0;
			int low = 0;
			int count = 0;
			while(m.find()) {
				if(count == 0) {
					low = Integer.parseInt(m.group());
					count += 1;
				}
				else {
					high = Integer.parseInt(m.group());
				}
			}

			for(int j = 0; j < wD.length; j++) {
				int wA = Integer.parseInt(wD[j][age]);
				if(wA > high || wA < low) {
					int[] badPartners = forbiddenPairs.get(i);
					boolean found = false;
					if(badPartners == null) {
						forbiddenPairs.put(i, new int[] {j});
					}
					else {
						int[] lst = new int[badPartners.length+1];
						int cnt = 0;
						for (int element : badPartners) {
							if (element == j) {
								found = true;
							}
							lst[cnt] = element;
							cnt++;
						}
						if(!found) {
							lst[cnt] = j;
							forbiddenPairs.put(i, lst);
						}
					}
				}
			}
		}
	}

	//Writes a string to write.txt
	static void write(String s) {
		String file = "write.txt";
		BufferedWriter w = null;
		try {
			w = new BufferedWriter(new FileWriter(file));
			w.write(s);
			w.close();
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	static boolean contains(int[] arr, int toCheckValue) 
	{
		if(arr.length == 0) {
			return false;
		}
		boolean test = false; 
		for (int element : arr) { 
			if (element == toCheckValue) { 
				test = true; 
				break; 
			} 
		} 
		return test;
	} 

	//Currently generates random rankings for the sake of testing.
	int[][] generateRankings(String[][] menData, String[][] womenData) {
		int mSize = menData.length;
		int wSize = womenData.length;
		int min = 5;
		int[][] out = new int[min][min];
		ArrayList<Integer> prefs = new ArrayList<Integer>(); 
		for(int i = 0; i < min; i++) {
			prefs.add(i);
		}
		for(int j = 0; j < min; j++) {
			ArrayList<Integer> temp = prefs;
			Collections.shuffle(temp);
			int[] trans = new int[min];
			for(int x = 0; x < min; x++) {
				trans[x] = temp.get(x);
			}
			out[j] = trans;
		}
		return out;
	}

	//Gale shapley forbidden pairs
	String gs(int[][] mP, int[][] wP, LinkedList<Integer> fM, HashMap<Integer, int[]> fP) {
		int numProposals = 0;
		int currMan = 0;
		HashMap<Integer, Integer> pairs = new HashMap<Integer, Integer>();
		HashMap<Integer, Integer> mPairs = new HashMap<Integer, Integer>();
		while(fM.size() > 0 && numProposals < mP[0].length) {
			currMan = fM.poll();
			int currWoman = wP[currMan][numProposals];
			if(pairs.get(currWoman) == null) {
				if((fP.get(currMan) != null) && contains(fP.get(currMan), currWoman)) {
					numProposals++;
					fM.addFirst(currMan);
				}
				else {
					pairs.put(currWoman, currMan);
					mPairs.put(currMan, currWoman);
					numProposals = 0;
				}
			}
			else {
				int husband = pairs.get(currWoman);
				int i = 0;
				int numChoices = wP[currWoman].length;
				while(i < numChoices) {
					int pref = wP[currWoman][i];
					if(pref == currMan) {
						if((fP.get(currMan) != null) && contains(fP.get(currMan), currWoman)) {
							numProposals++;
							i = numChoices;
							fM.addFirst(currMan);
						}
						else {
							pairs.put(currWoman, currMan);
							mPairs.put(currMan, currWoman);
							mPairs.remove(husband);
							fM.addFirst(husband);
							numProposals = 0;
							i = numChoices;
						}
					}
					else if(pref == husband) {
						numProposals++;
						i = numChoices;
						fM.addFirst(currMan);
					}
					i++;
				}
			}
		}
		Set<Integer> keys = mPairs.keySet();
		Iterator<Integer> it = keys.iterator();
		String ret = "";
		while(it.hasNext()){
			ret += mPairs.get(it.next()) + "\n";
		}
		return ret;
	}

	void crushMatch(String[][] mD, String[][] wD) {
		int numCM = 0;
		for(int i = 0; i < mD.length; i++) {
			String[] netIDs = menData[i][46].split(">");
			String currID = menData[i][47];
			currID = currID.replace("@cornell.edu", "");
			if(!(netIDs[0].equals(""))) {
				for(String id : netIDs) {
					id = id.replaceAll(" ", "");
					for(int j = 0; j < wD.length; j++) {
						String email = womenData[j][47];
						email = email.replace("@cornell.edu", "");
						if(email.equals(id)) {
							String[] data = womenData[j][46].split(">");
							if(!(data[0].equals(""))) {
								for(String pref : data) {
									pref = pref.replaceAll(" ", "");
									if(pref.equals(currID)) {
										System.out.println(email + " and " + currID);
										numCM++;
									}
								}
							}
						}
					}
				}
			}
		}
		System.out.println("Num crushes: " + numCM);
	}

	/*
	 * read() loads all data from the userData file into two arrays, menData
	 * and womenData.
	 */
	void read() {
		boolean flag = true;
		int numMen = 0;
		int numWomen = 0;
		for(int z = 0; z < 2; z++) {
			if(flag) {
				BufferedReader r = null;
				try {
					r = new BufferedReader(new FileReader(userData));
					String[] personData = null;
					String line = "";
					for(int i = 0; i < 5000; i++) {
						line = r.readLine();
						personData = line.split(",");
						if(personData.length == 0) {

						}
						else {
							if(personData[gender].equals("male")) {
								numMen++;
								numPeople++;
							}
							else if(personData[gender].equals("female")) {
								numWomen++;
								numPeople++;
							}
						}
					}
					System.out.println("Number of total people: " + numPeople);
					flag = false;
					r.close();
				}
				catch(Exception e) {
					flag = false;
					System.out.println("Number of total people: " + numPeople);
				}
			}
			else {
				menData = new String[numMen][];
				womenData = new String[numWomen][];
				int menCount = 0;
				int womenCount = 0;
				BufferedReader r = null;
				try {
					r = new BufferedReader(new FileReader(userData));
					String[] personData = null;
					String line = "";
					for(int i = 0; i < numPeople*4; i++) {
						line = r.readLine();
						personData = line.split(",");
						if(personData.length == 0) {

						}
						else {
							if(personData[gender].equals("male")) {
								menData[menCount] = personData;
								menCount++;
							}
							else if(personData[gender].equals("female")) {
								womenData[womenCount] = personData;
								womenCount++;
							}
						}

					}
					System.out.println("Number of men loaded: " + menCount);
					System.out.println("Number of women loaded: " + womenCount);
					System.out.println("Done processing");
					System.out.println("_________________________________________________________");

					r.close();
				}
				catch(Exception e) {
					System.out.println("Number of men loaded: " + menCount);
					System.out.println("Number of women loaded: " + womenCount);
					System.out.println("Done processing");
					System.out.println("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
				}
			}
		}
	}

}