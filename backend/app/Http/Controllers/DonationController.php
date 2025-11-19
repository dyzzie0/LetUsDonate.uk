<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Models\DonationItem;
use App\Models\Donor;
use App\Models\Charity;
use Illuminate\Support\Facades\DB;

class DonationController extends Controller
{
    // Add a new donation
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'item_name' => 'required|string',
            'category' => 'required|string',
            'type' => 'required|string',
            'condition' => 'required|string',
            'description' => 'nullable|string',
            'charity_name' => 'required|string',
            'item_image' => 'nullable|image|max:2048'
        ]);

        try {
            DB::beginTransaction();

            // Find donor
            $donor = Donor::where('user_ID', $request->user_id)->firstOrFail();

            // Find charity
            $charity = Charity::where('charity_name', $request->charity_name)->firstOrFail();

            //creates donation
            $donation = Donation::create([
                'donor_ID' => $donor->donor_ID,
                'charity_ID' => $charity->charity_ID,
                'donation_status' => 'Pending',
                'donation_date' => now(),
            ]);

            //handles image upload (optional)
            $imagePath = null;
            if ($request->hasFile('item_image')) {
                $imagePath = $request->file('item_image')->store('uploads', 'public');
            }

            //creates donation item
            DonationItem::create([
                'donation_ID' => $donation->donation_ID,
                'item_name' => $request->item_name,
                'item_category' => $request->category,
                'item_size' => $request->type,
                'item_condition' => $request->condition,
                'item_description' => $request->description,
                'item_image' => $imagePath,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Donation submitted successfully!'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    //gets donations
    public function index(Request $request)
    {
        $user_id = $request->query('user_id');

        try {
            if ($user_id) {
                //donation specific to user
                $donations = DB::table('donation as d')
                    ->join('donation_item as di', 'd.donation_ID', '=', 'di.donation_ID')
                    ->join('charity as c', 'd.charity_ID', '=', 'c.charity_ID')
                    ->join('donor as don', 'd.donor_ID', '=', 'don.donor_ID')
                    ->join('user as u', 'don.user_ID', '=', 'u.user_ID')
                    ->where('u.user_ID', $user_id)
                    ->orderBy('d.donation_date', 'desc')
                    ->select(
                        'd.donation_ID',
                        'di.item_name',
                        'di.item_category',
                        'di.item_condition',
                        'di.item_description',
                        'di.item_image',
                        'c.charity_name',
                        'd.donation_status',
                        'd.donation_date'
                    )
                    ->get();
            } else {
                //what admins view(all donations)
                $donations = DB::table('donation as d')
                    ->join('donation_item as di', 'd.donation_ID', '=', 'di.donation_ID')
                    ->join('donor as don', 'd.donor_ID', '=', 'don.donor_ID')
                    ->join('user as u', 'don.user_ID', '=', 'u.user_ID')
                    ->join('charity as c', 'd.charity_ID', '=', 'c.charity_ID')
                    ->orderBy('d.donation_date', 'desc')
                    ->select(
                        'd.donation_ID',
                        'di.item_name',
                        'di.item_category',
                        'di.item_condition',
                        'di.item_description',
                        'di.item_image',
                        'u.user_name as donor_name',
                        'c.charity_name',
                        'd.donation_status',
                        'd.donation_date'
                    )
                    ->get();
            }

            return response()->json([
                'status' => 'success',
                'donations' => $donations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
